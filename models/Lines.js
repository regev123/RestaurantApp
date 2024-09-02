const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a reservation
const linesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  menuItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'menu_items',
    },
  ],
});

linesSchema.pre(/^find/, function (next) {
  this.populate('menuItems');
  next();
});

// Create the model
const Lines = mongoose.model('lines', linesSchema);

module.exports = Lines;
