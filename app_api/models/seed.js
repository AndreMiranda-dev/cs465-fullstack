const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);


// Load the model (your file is travlr.js)
require('./travlr');
const Trip = mongoose.model('Trip');

// Load trips.json from the data folder
const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

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

seed();
