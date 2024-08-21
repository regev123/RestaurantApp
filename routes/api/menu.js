const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/restrictTo');
const Category = require('../../models/MenuItem/MenuItemCategory');
const MenuItem = require('../../models/MenuItem/MenuItem');
//--------------------------Categories section------------------------------------------

// @route    POST api/menu/addMenuItemCategory
// @desc     Add new menu item category
// @access   Private Admin
router.post(
  '/addMenuItemCategory',
  auth,
  restrictTo('admin'),
  check('name', 'category name is required').notEmpty().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, order } = req.body;

    try {
      //check if the category name exists
      if (await Category.exists({ name }))
        return res
          .status(400)
          .send({ errors: [{ msg: 'Category name is already exists!' }] });

      // if not create one and save it
      menuItemCategory = new Category({
        name,
        order,
      });

      await menuItemCategory.save();
      //return all the categories with the new one that added
      res.json(await getAllCategories());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    GET api/menu/getMenuItemCategories
// @desc     GET all existing menu item categories
// @access   Private
router.get('/getMenuItemCategories', auth, async (req, res) => {
  try {
    //get all the categories from DB and return them
    res.json(await getAllCategories());
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route    DELETE api/menu/deleteMenuItemCategory/:id
// @desc     GET all existing menu item categories
// @access   Private Admin
router.delete(
  '/deleteMenuItemCategory/:id',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      //find the category by its _id and delete him
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      //if the return value is null then the category is not exist in DB return error
      if (deletedCategory === null) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Category name is not exist!' }] });
      }
      //if the category exists return all the categories after the delete
      res.json(await getAllCategories());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    POST api/menu/changeOrderMenuItemCategories
// @desc     Change the order of the menu item categories
// @access   Private Admin
router.post(
  '/changeOrderMenuItemCategories',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      await Category.deleteMany({});
      res.json(await Category.insertMany(req.body));
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

async function getAllCategories() {
  try {
    return await Category.find();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}

//--------------------------MenuItem section------------------------------------------

// @route    POST api/menu/addMenuItem
// @desc     Add new menu item
// @access   Private Admin
router.post(
  '/addMenuItem',
  auth,
  restrictTo('admin'),
  check('name', 'name is required').notEmpty(),
  check('price', 'price is required').notEmpty(),
  check('category', 'category is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, ingredients, category, imageUrl } = req.body;

    //check if the menu item is already exists by the unique name if is exist return an error
    if (await MenuItem.exists({ name }))
      return res.status(400).send({
        errors: [{ msg: 'Menu item with that name is already exists!' }],
      });

    //check if the category is exists in the menuItemCategory table if not return an error
    const categoryObject = await Category.findOne({ name: category });

    if (!categoryObject)
      return res.status(400).send({
        errors: [{ msg: 'menu item category is not exists!' }],
      });

    try {
      //if all the validations on DB passed create the new object and save it
      const menuItem = new MenuItem({
        name,
        price,
        ingredients,
        category: categoryObject._id,
        imageUrl,
      });

      await menuItem.save();
      //return all the menu items of the table with the new one
      res.json(await getAllMenuItems());
    } catch (err) {
      if (err.message.includes('price must be greater then zero!'))
        return res
          .status(400)
          .send({ errors: [{ msg: 'price must be greater then zero!' }] });
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    UPDATE api/menu/closeOrOpenMenuItem
// @desc     UPDATE close boolean variable of menu Item
// @access   Private Admin
router.put(
  '/closeOrOpenMenuItem',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    const { name } = req.body;

    try {
      const menuItem = await MenuItem.findOne({ name });
      menuItem.close = !menuItem.close;
      await menuItem.save();
      res.json(await getAllMenuItems());
    } catch (err) {
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    GET api/menu/getMenuItems
// @desc     Get all menu items
// @access   Private
router.get('/getMenuItems', auth, async (req, res) => {
  try {
    res.json(await getAllMenuItems());
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
});

// @route    DELETE api/menu/deleteMenuItem/:id
// @desc     Delete a menu item
// @access   Private Admin
router.delete(
  '/deleteMenuItem/:id',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      //find the menu item by its _id and delete him
      const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
      //if the return value is null then the category is not exist in DB return error
      if (deletedMenuItem === null) {
        return res
          .status(400)
          .send({ errors: [{ msg: 'Menu item is not exist!' }] });
      }
      //if the category exists return all the categories after the delete
      res.json(await getAllMenuItems());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    DELETE api/menu/deleteAllMenuItemOfCategory/:id
// @desc     Delete all menu items of category
// @access   Private Admin
router.delete(
  '/deleteAllMenuItemsOfCategory/:id',
  auth,
  restrictTo('admin'),
  async (req, res) => {
    try {
      await MenuItem.deleteMany({
        category: req.params.id,
      });
      res.json(await getAllMenuItems());
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// @route    UPDATE api/menu/updateMenuItem/
// @desc     UPDATE an existing menu item
// @access   Private Admin
router.put('/updateMenuItem/', auth, restrictTo('admin'), async (req, res) => {
  try {
    if (req.body.imageUrl === '')
      req.body.imageUrl =
        'https://www.shutterstock.com/image-illustration/not-available-red-rubber-stamp-260nw-586791809.jpg';

    const { name, price, ingredients, category, imageUrl } = req.body;
    //make filter of menu item by is name that you want to update
    const filter = { name };

    const categoryObj = await Category.findOne({ name: category });

    //make updateDoc of menu item by is variables that you want to change(change all of its existing by not search what to update so update all )
    const updateDoc = {
      $set: { price, ingredients, category: categoryObj._id, imageUrl },
    };

    const result = await MenuItem.updateOne(filter, updateDoc);

    res.json(await getAllMenuItems());
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
});

async function getAllMenuItems() {
  try {
    return await MenuItem.find();
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: 'Internal server error' }] });
  }
}
module.exports = router;
