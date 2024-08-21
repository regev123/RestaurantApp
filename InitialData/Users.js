const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming you have defined the MenuItemCategory model

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
    await mongoose.connection.db.dropCollection('users');
    console.log('Dropped Users collection');

    const numUsers = 15;

    const user = new User({
      name: `regev admin`,
      email: `regevregev8@gmail.com`,
      password: '12345678', // Replace with your desired initial password
      role: 'admin', // Assigning 'admin' role to the first user, 'user' role to others
    });
    await user.save();
    for (let i = 0; i < numUsers; i++) {
      const user = new User({
        name: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: 'password123', // Replace with your desired initial password
        role: i === 0 ? 'admin' : 'user', // Assigning 'admin' role to the first user, 'user' role to others
      });

      await user.save();
      console.log(`User ${user.name} created`);
    }

    console.log('Users generation completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating tables:', error);
  }
}

// Call the function to connect and insert data
connectToDB();
