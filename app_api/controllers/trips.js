const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// Helper to send JSON responses
const sendJSONResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// GET /api/trips  → return all trips
module.exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    sendJSONResponse(res, 200, trips);
  } catch (err) {
    sendJSONResponse(res, 500, { message: 'Error retrieving trips', error: err });
  }
};

// GET /api/trips/:code  → return one trip by code
module.exports.tripsFindByCode = async (req, res) => {
  try {
    const tripCode = req.params.code;
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return sendJSONResponse(res, 404, { message: 'Trip not found' });
    }

    sendJSONResponse(res, 200, trip);
  } catch (err) {
    sendJSONResponse(res, 500, { message: 'Error retrieving trip', error: err });
  }
};

// GET /api/trips/details/:slug → return one trip by slug (validated)
module.exports.tripsFindBySlug = async (req, res) => {
  const slug = req.params.slug;

  // Validate slug
  if (!slug || typeof slug !== 'string') {
    return sendJSONResponse(res, 400, {
      status: 400,
      message: 'Invalid slug format.'
    });
  }

  try {
    const trip = await Trip.findOne({ slug }).exec();

    if (!trip) {
      return sendJSONResponse(res, 404, {
        status: 404,
        message: 'Trip not found.'
      });
    }

    return sendJSONResponse(res, 200, trip);

  } catch (err) {
    console.error('DB Error:', err.message);

    return sendJSONResponse(res, 500, {
      status: 500,
      message: 'Database error occurred.'
    });
  }
};
