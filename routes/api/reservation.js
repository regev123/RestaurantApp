const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/restrictTo');
const Reservation = require('../../models/Reservation');
//--------------------------Categories section------------------------------------------

// @route    POST api/reservation/openNewReservation
// @desc     Add new reservation
// @access   Private
router.post('/openNewReservation', auth, async (req, res) => {
  const { tableId, menuItems } = req.body;

  const items = menuItems.map((item) => {
    return {
      itemName: item.name,
      ingredientsRemoved: item.removedIngredients
        ? item.removedIngredients
        : [],
      itemPrice: item.price,
      hold: item.hold,
    };
  });

  try {
    //initalize the reservation model
    const tableReservation = new Reservation({
      items,
      table: tableId,
    });
    // save the reservation model
    await tableReservation.save();

    //return all reservations for the table with the new one that added
    res.json(await getAllReservationsForTable(tableId));
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route    GET api/reservation/getTableReservationsList
// @desc     Get all reservations of table
// @access   Private
router.get('/getTableReservationsList/:id', auth, async (req, res) => {
  //return all reservations for the table with the new one that added
  res.json(await getAllReservationsForTable(req.params.id));
});

// @route    GET api/reservation/getTableReservationsList
// @desc     Get all reservations of table
// @access   Private
router.get('/getReservations', auth, async (req, res) => {
  //return all reservations
  res.json(await getAllReservations());
});

// @route    POST api/reservation/removeHold
// @desc     POST set hold to false for reservation item
// @access   Private
router.post('/removeHold/', auth, async (req, res) => {
  const { reservationId, itemId } = req.body;

  await Reservation.updateOne(
    { _id: reservationId, 'items._id': itemId },
    {
      $set: {
        'items.$.hold': false,
        'items.$.fire': true,
        'items.$.fireTimestamp': Date.now(),
      },
    }
  );
  const reservation = await Reservation.findById(reservationId)
    .populate('table')
    .exec();
  res.json(await getAllReservationsForTable(reservation.table._id));
});

async function getAllReservationsForTable(tableId) {
  try {
    return await Reservation.find({ table: tableId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}

async function getAllReservations() {
  try {
    return await Reservation.find();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}

// @route    POST api/reservation/deleteItem
// @desc     POST set delete to true for reservation item
// @access   Private
router.post('/deleteItem/', auth, async (req, res) => {
  const { reservationId, itemId } = req.body;

  await Reservation.updateOne(
    { _id: reservationId, 'items._id': itemId },
    {
      $set: {
        'items.$.delete': true,
      },
    }
  );
  const reservation = await Reservation.findById(reservationId)
    .populate('table')
    .exec();
  res.json(await getAllReservationsForTable(reservation.table._id));
});

// @route    POST api/reservation/setItemAsClose
// @desc     POST set open to false for reservation item
// @access   Private
router.post('/setItemAsClose/', auth, async (req, res) => {
  const { reservationId, itemId } = req.body;

  await Reservation.updateOne(
    { _id: reservationId, 'items._id': itemId },
    {
      $set: {
        'items.$.open': false,
      },
    }
  );
  const reservation = await Reservation.findById(reservationId)
    .populate('table')
    .exec();
  res.json(await getAllReservationsForTable(reservation.table._id));
});

async function getAllReservationsForTable(tableId) {
  try {
    return await Reservation.find({ table: tableId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}

module.exports = router;
