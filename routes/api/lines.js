const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/restrictTo');

const Lines = require('../../models/Lines');
const MenuItem = require('../../models/MenuItem/MenuItem');
// @route    GET api/lines/getLines
// @desc     Get all lines of the restaurant
// @access   Private
router.get('/getLines', auth, async (req, res) => {
  res.json(await getAllLines());
});

router.post('/addLine', auth, restrictTo('admin'), async (req, res) => {
  const { name } = req.body;

  try {
    line = new Lines({
      name,
    });

    await line.save();

    res.json(await getAllLines());
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
});

router.delete(
  '/deleteLine/:id',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      const deletedLine = await Lines.findByIdAndDelete(req.params.id);
      if (deletedLine === null) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Line is not exist!' }] });
      }

      res.json(await getAllLines());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

router.post(
  '/addMenuItemToLine',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    const { line, item } = req.body;

    try {
      const lineDoc = await Lines.findById(line._id);
      if (!lineDoc) {
        return res.status(404).send({ errors: [{ msg: 'Line not found' }] });
      }

      const menuItemDoc = await MenuItem.findById(item._id);
      if (!menuItemDoc) {
        return res
          .status(404)
          .send({ errors: [{ msg: 'Menu item not found' }] });
      }

      // Add menu item if not already present
      const updatedLine = await Lines.findOneAndUpdate(
        { _id: lineDoc._id, menuItems: { $ne: menuItemDoc._id } }, // Only update if itemId is not already present
        { $addToSet: { menuItems: menuItemDoc._id } }, // Add itemId to menuItems if not already present
        { new: true } // Return the updated document
      );

      if (!updatedLine) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Menu item already added to this line' }] });
      }

      res.json(await getAllLines());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

router.delete(
  '/deleteMenuItemFromLine/:lineId/:itemId',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      await Lines.findOneAndUpdate(
        { _id: req.params.lineId }, // Find the line by its ID
        { $pull: { menuItems: req.params.itemId } } // Remove the itemId from the menuItems array
      );

      res.json(await getAllLines());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

async function getAllLines() {
  try {
    const lines = await Lines.find();
    //console.log(lines);
    return lines;
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}

module.exports = router;
