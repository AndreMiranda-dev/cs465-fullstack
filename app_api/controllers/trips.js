// Implements all Trip API controller actions including listing, retrieving,
// creating, and updating trips in the MongoDB database.

const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// Sends a JSON response with the given status and payload.
const sendJSONResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// Safe date parser
const safeParseDate = (value) => {
  if (!value) return undefined;
  const parsed = Date.parse(value);
  return isNaN(parsed) ? undefined : new Date(parsed);
};

// Safe number parser
const safeParseNumber = (value) => {
  if (value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return isNaN(parsed) ? undefined : parsed;
};

// Returns all trips from the database.
module.exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    sendJSONResponse(res, 200, trips);
  } catch (err) {
    sendJSONResponse(res, 500, { message: 'Error retrieving trips', error: err });
  }
};

// Returns a single trip using its unique trip code.
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

// Returns a single trip using its slug, with validation for proper format.
module.exports.tripsFindBySlug = async (req, res) => {
  const slug = req.params.slug;

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

// Creates a new trip using data provided in the request body.
module.exports.tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: safeParseDate(req.body.start),
      resort: req.body.resort,
      perPerson: safeParseNumber(req.body.perPerson),
      image: req.body.image,
      description: req.body.description
    });

    sendJSONResponse(res, 201, trip);
  } catch (err) {
    console.error("Trip creation error:", err);
    sendJSONResponse(res, 400, {
      message: 'Error creating trip',
      error: err
    });
  }
};

// Updates an existing trip using its trip code.
module.exports.tripsUpdateTrip = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    const updatedTrip = await Trip.findOneAndUpdate(
      { code: tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: safeParseDate(req.body.start),
        resort: req.body.resort,
        perPerson: safeParseNumber(req.body.perPerson),
        image: req.body.image,
        description: req.body.description
      },
      { new: true, runValidators: false }
    ).exec();

    if (!updatedTrip) {
      return sendJSONResponse(res, 404, { message: 'Trip not found' });
    }

    return sendJSONResponse(res, 200, updatedTrip);

  } catch (err) {
    console.error("Trip update error:", err);
    return sendJSONResponse(res, 400, {
      message: 'Error updating trip',
      error: err
    });
  }
};
