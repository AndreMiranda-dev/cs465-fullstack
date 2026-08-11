// Establishes the MongoDB connection using Mongoose and registers lifecycle events.

const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/travlr';

// Initiates the connection to the MongoDB instance.
mongoose.connect(dbURI);

// Logs successful connection to the database.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

// Logs any connection errors encountered by Mongoose.
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

// Logs when Mongoose disconnects from the database.
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Ensures clean shutdown of the database connection on app termination.
// Mongoose v7+ no longer accepts a callback in connection.close()
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  } catch (err) {
    console.log('Error during Mongoose shutdown:', err);
    process.exit(1);
  }
});

// Loads all Mongoose models used by the application.
require('./travlr');
require('./user');
