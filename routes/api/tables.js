const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/restrictTo');
const Table = require('../../models/Table');

// @route    POST api/tables/addTable
// @desc     Add new table
// @access   Private Admin
router.post(
  '/addTable',
  auth,
  restrictTo('admin'),
  check('seats', 'Seats Number is must be a Numeric type').isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { seats } = req.body;

    try {
      table = new Table({
        seats,
      });

      await table.save();

      res.json(await getAllTables());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    DELETE api/tables/deleteTable/:id
// @desc     Delete an existing table
// @access   Private Admin
router.delete(
  '/deleteTable/:id',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      const deletedTable = await Table.findByIdAndDelete(req.params.id);
      if (deletedTable === null) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Table is not exist!' }] });
      }

      res.json(await getAllTables());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    GET api/tables/getTables
// @desc     Get all the tables
// @access   Private
router.get('/getTables', auth, async (req, res) => {
  try {
    res.json(await getAllTables());
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
});

async function getAllTables() {
  try {
    return await Table.find();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}
module.exports = router;
