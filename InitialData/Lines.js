const mongoose = require('mongoose');
const Lines = require('../models/Lines');
const MenuItem = require('../models/MenuItem/MenuItem');

const dbURL =
  'mongodb+srv://regevAvital:LGYTRduRJmsK6SqX@cluster0.wvw0vas.mongodb.net/test?retryWrites=true&w=majority';

// Array of categories to insert
const linesData = [
  { name: 'Fry Line' },
  { name: 'Hot Line' },
  { name: 'Stove Line' },
  { name: 'Checker Line' },
  { name: 'Grill Line' },
  { name: 'Pizza Line' },
  { name: 'Pastry Line' },
  { name: 'Bar Line' },
  { name: 'Cold Line' },
  { name: 'Soup Line' },
];

const menuItemsToLine = [
  {
    lineName: 'Fry Line',
    menuItemsList: [
      'French Fries',
      'Onion Rings',
      'Garlic Mashed Potatoes',
      'Chicken Wings',
    ],
  },
  {
    lineName: 'Soup Line',
    menuItemsList: [
      'Tomato Soup',
      'Chicken Noodle Soup',
      'Miso Soup',
      'Pumpkin Soup',
      'Lentil Soup',
    ],
  },
  {
    lineName: 'Cold Line',
    menuItemsList: [
      'Caesar Salad',
      'Greek Salad',
      'Caprese Salad',
      'Spinach Salad',
      'Nicoise Salad',
      'BLT Sandwich',
      'Club Sandwich',
      'Vegetarian Sandwich',
      'Coleslaw',
    ],
  },
  {
    lineName: 'Bar Line',
    menuItemsList: ['Margarita', 'Mojito', 'Sangria', 'Espresso', 'Smoothie'],
  },
  {
    lineName: 'Pastry Line',
    menuItemsList: [
      'Tiramisu',
      'Chocolate Cake',
      'Cheesecake',
      'Apple Pie',
      'Panna Cotta',
      'Pancakes',
    ],
  },
  {
    lineName: 'Pizza Line',
    menuItemsList: [
      'Lasagna',
      'Margherita Pizza',
      'Pepperoni Pizza',
      'Vegetarian Pizza',
      'Hawaiian Pizza',
      'BBQ Chicken Pizza',
    ],
  },
  {
    lineName: 'Grill Line',
    menuItemsList: [
      'Grilled Salmon',
      'Filet Mignon',
      'Grilled Cheese Sandwich',
    ],
  },
  {
    lineName: 'Stove Line',
    menuItemsList: [
      'Breakfast Burrito',
      'Eggs Benedict',
      'Omelette',
      'Steamed Vegetables',
      'Vegetable Stir Fry',
      'Spaghetti Bolognese',
      'Stuffed Mushrooms',
    ],
  },
  {
    lineName: 'Hot Line',
    menuItemsList: [
      'Shrimp Cocktail',
      'Garlic Bread',
      'Bruschetta',
      'Chicken Wrap',
      'Avocado Toast',
    ],
  },
  {
    lineName: 'Checker Line',
    menuItemsList: [
      'Shrimp Cocktail',
      'Garlic Bread',
      'Bruschetta',
      'Chicken Wrap',
      'Avocado Toast',
      'Breakfast Burrito',
      'Eggs Benedict',
      'Omelette',
      'Steamed Vegetables',
      'Vegetable Stir Fry',
      'Spaghetti Bolognese',
      'Stuffed Mushrooms',
      'Grilled Salmon',
      'Filet Mignon',
      'Grilled Cheese Sandwich',
      'Lasagna',
      'Margherita Pizza',
      'Pepperoni Pizza',
      'Vegetarian Pizza',
      'Hawaiian Pizza',
      'BBQ Chicken Pizza',
      'Tiramisu',
      'Chocolate Cake',
      'Cheesecake',
      'Apple Pie',
      'Panna Cotta',
      'Pancakes',
      'Caesar Salad',
      'Greek Salad',
      'Caprese Salad',
      'Spinach Salad',
      'Nicoise Salad',
      'BLT Sandwich',
      'Club Sandwich',
      'Vegetarian Sandwich',
      'Coleslaw',
      'Tomato Soup',
      'Chicken Noodle Soup',
      'Miso Soup',
      'Pumpkin Soup',
      'Lentil Soup',
      'French Fries',
      'Onion Rings',
      'Garlic Mashed Potatoes',
      'Chicken Wings',
    ],
  },
];

// Function to connect to MongoDB and insert categories
async function connectToDB() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Drop MenuItemCategory collection
    await mongoose.connection.db.dropCollection('lines');
    console.log('Dropped MenuItemCategory collection');

    // Insert categories into MongoDB
    await Lines.insertMany(linesData);
    console.log('Categories inserted successfully');

    // Update Lines with MenuItems
    for (const line of menuItemsToLine) {
      const lineObject = await Lines.findOne({ name: line.lineName });
      console.log('insert into line ', lineObject.name);
      for (const itemName of line.menuItemsList) {
        const menuItemObject = await MenuItem.findOne({ name: itemName });
        if (menuItemObject) {
          await Lines.findOneAndUpdate(
            { _id: lineObject._id, menuItems: { $ne: menuItemObject._id } },
            { $addToSet: { menuItems: menuItemObject._id } },
            { new: true }
          );
          console.log(
            'added menu item  ',
            menuItemObject.name,
            ' to line ',
            lineObject.name
          );
        }
      }
    }
    // Disconnect after inserting data (optional)
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect and insert data
connectToDB();
