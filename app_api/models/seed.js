// Seeds the database with initial Trip data by loading JSON and inserting it into MongoDB.

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connects to the Travlr MongoDB instance.
const dbURI = 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);

// Loads the Trip model definition.
require('./travlr');
const Trip = mongoose.model('Trip');

// Reads the trips.json seed file from the data directory.
const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Clears existing Trip documents and inserts fresh seed data.
const seed = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Trips seeded successfully');
  } catch (err) {
    console.error('Error seeding trips:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Executes the seeding process.
seed();
