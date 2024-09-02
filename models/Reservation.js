const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for an item in the reservation
const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  ingredientsRemoved: {
    type: [String], // Array of strings for ingredients
    default: [],
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  hold: {
    type: Boolean,
    required: true,
  },
  open: {
    type: Boolean,
    default: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  fire: {
    type: Boolean,
    default: false,
  },
  fireTimestamp: {
    type: Date,
  },
});

// Define the schema for a reservation
const reservationSchema = new Schema({
  items: [itemSchema], // Array of itemSchema
  table: {
    type: Schema.Types.ObjectId,
    ref: 'table',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reservationSchema.pre(/^find/, function (next) {
  this.populate('table');
  next();
});

// Create the model
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
