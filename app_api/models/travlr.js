// Defines the Trip schema and registers the Trip model for MongoDB operations.

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  // Unique trip identifier used for lookup and routing.
  code: { type: String, required: true, unique: true },

  // Display name of the trip.
  name: { type: String, required: true },

  // Duration of the trip (e.g., "7 nights").
  length: { type: String, required: true },

  // Start date for the trip itinerary.
  start: { type: Date, required: true },

  // Resort or destination associated with the trip.
  resort: { type: String, required: true },

  // Price per person for the trip.
  perPerson: { type: Number, required: true },

  // Filename of the trip image stored in the public assets.
  image: { type: String, required: true },

  // Full HTML‑enabled description of the trip.
  description: { type: String, required: true }
});

// Registers the Trip model with Mongoose.
mongoose.model('Trip', tripSchema);
