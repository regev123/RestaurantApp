const mongoose = require('mongoose');
const MenuItemCategory = require('./MenuItemCategory');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  canRemove: {
    type: Boolean,
    default: true, // Default value can be true or false based on your needs
  },
});

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
  ingredients: [IngredientSchema],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'menu_item_categories',
    required: true,
  },
  imageUrl: {
    type: String,
  },
  close: {
    type: Boolean,
    default: false,
  },
});

MenuItemSchema.pre(/^find/, function (next) {
  this.populate('category');
  next();
});

// Pre-save hook: Runs before saving a new document
MenuItemSchema.pre('save', function (next) {
  if (this.imageUrl === '')
    this.imageUrl =
      'https://www.shutterstock.com/image-illustration/not-available-red-rubber-stamp-260nw-586791809.jpg';
  next();
});

module.exports = MenuItem = mongoose.model('menu_items', MenuItemSchema);
