const mongoose = require('mongoose');
const MenuItemCategory = require('../models/MenuItem/MenuItemCategory'); // Assuming you have defined the MenuItemCategory model

const dbURL =
  'mongodb+srv://regevAvital:LGYTRduRJmsK6SqX@cluster0.wvw0vas.mongodb.net/test?retryWrites=true&w=majority';

// Array of categories to insert
const categoriesData = [
  { name: 'Appetizers', order: 1 },
  { name: 'Main Courses', order: 2 },
  { name: 'Desserts', order: 3 },
  { name: 'Drinks', order: 4 },
  { name: 'Salads', order: 5 },
  { name: 'Sandwiches', order: 6 },
  { name: 'Pizzas', order: 7 },
  { name: 'Soups', order: 8 },
  { name: 'Side Dishes', order: 9 },
  { name: 'Breakfast', order: 10 },
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
    await mongoose.connection.db.dropCollection('menu_item_categories');
    console.log('Dropped MenuItemCategory collection');

    // Insert categories into MongoDB
    await MenuItemCategory.insertMany(categoriesData);
    console.log('Categories inserted successfully');

    // Disconnect after inserting data (optional)
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect and insert data
connectToDB();
