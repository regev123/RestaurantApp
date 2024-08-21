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

// Post hook to update orders after deletion
MenuItemCategorySchema.post('findOneAndDelete', async function (doc) {
  if (!doc) return; // If no document was deleted, do nothing

  await this.model.updateMany(
    { order: { $gt: doc.order } },
    { $inc: { order: -1 } }
  );
});

module.exports = MenuItemCategory = mongoose.model(
  'menu_item_categories',
  MenuItemCategorySchema
);
