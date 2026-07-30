const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// Logging helper
const logError = (location, err) => {
    console.error(`[${new Date().toISOString()}] ERROR in ${location}: ${err.message}`);
};

// Helper to send JSON responses
const sendJSONResponse = (res, status, content) => {
    res.status(status).json(content);
};

// GET /api/trips – return all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        return sendJSONResponse(res, 200, trips);
    } catch (err) {
        logError('tripsList', err);
        return sendJSONResponse(res, 500, {
            status: 500,
            message: 'Error retrieving trips'
        });
    }
};

// GET /api/trips/:tripCode – return one trip by code
const tripsFindByCode = async (req, res) => {
    const tripCode = req.params.tripCode;

    if (!tripCode || typeof tripCode !== 'string') {
        return sendJSONResponse(res, 400, {
            status: 400,
            message: 'Invalid trip code format'
        });
    }

    try {
        const trip = await Trip.findOne({ code: tripCode });

        if (!trip) {
            return sendJSONResponse(res, 404, {
                status: 404,
                message: 'Trip not found'
            });
        }

        return sendJSONResponse(res, 200, trip);

    } catch (err) {
        logError('tripsFindByCode', err);
        return sendJSONResponse(res, 500, {
            status: 500,
            message: 'Error retrieving trip'
        });
    }
};

// GET /api/trips/details/:slug – return one trip by slug
const tripsFindBySlug = async (req, res) => {
    const slug = req.params.slug;

    if (!slug || typeof slug !== 'string') {
        return sendJSONResponse(res, 400, {
            status: 400,
            message: 'Invalid slug format'
        });
    }

    try {
        const trip = await Trip.findOne({ slug });

        if (!trip) {
            return sendJSONResponse(res, 404, {
                status: 404,
                message: 'Trip not found'
            });
        }

        return sendJSONResponse(res, 200, trip);

    } catch (err) {
        logError('tripsFindBySlug', err);
        return sendJSONResponse(res, 500, {
            status: 500,
            message: 'Database error occurred'
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsFindBySlug
};
