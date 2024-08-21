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

async function getAllReservationsForTable(tableId) {
  try {
    return await Reservation.find({ table: tableId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}

module.exports = router;
