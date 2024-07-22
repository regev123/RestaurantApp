const mongoose = require('mongoose');

const MenuItemCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = MenuItemCategory = mongoose.model(
  'menu_item_categories',
  MenuItemCategorySchema
);
