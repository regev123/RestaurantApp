const mongoose = require('mongoose');
const MenuItemCategory = require('./MenuItemCategory');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (e) {
        return e > 0;
      },
      message: 'price must be greater then zero!',
    },
  },
  ingredients: {
    type: [String],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'menu_item_categories',
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

MenuItemSchema.pre(/^find/, function (next) {
  this.populate('category');
  next();
});

module.exports = MenuItem = mongoose.model('menu_items', MenuItemSchema);
