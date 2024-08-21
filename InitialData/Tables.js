const mongoose = require('mongoose');
const Table = require('../models/Table'); // Assuming you have defined the MenuItemCategory model

const dbURL =
  'mongodb+srv://regevAvital:LGYTRduRJmsK6SqX@cluster0.wvw0vas.mongodb.net/test?retryWrites=true&w=majority';

// Function to connect to MongoDB and insert tables
async function connectToDB() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Drop MenuItemCategory collection
    await mongoose.connection.db.dropCollection('tables');
    console.log('Dropped Tables collection');

    const numTables = 30;

    for (let i = 0; i < numTables; i++) {
      const table = new Table();
      table.seats = Math.floor(Math.random() * (14 - 2 + 1)) + 2; // Random seats between 2 and 14
      await table.save();
    }

    console.log('Tables generation completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating tables:', error);
  }
}

// Call the function to connect and insert data
connectToDB();
