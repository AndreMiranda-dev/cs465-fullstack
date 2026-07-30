// GET Travel page using API
const travel = async (req, res) => {
    const tripsEndpoint = 'http://localhost:3000/api/trips';

    try {
        const response = await fetch(tripsEndpoint, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        // Check API status
        if (!response.ok) {
            console.error(`[${new Date().toISOString()}] FETCH ERROR in travel: API returned ${response.status}`);

            return res.status(response.status).render('error', {
                title: 'Error Loading Trips',
                message: `The trips API returned status ${response.status}.`
            });
        }

        const trips = await response.json();

        // Validate JSON structure
        if (!Array.isArray(trips)) {
            console.error(`[${new Date().toISOString()}] FETCH ERROR in travel: API did not return an array`);

            return res.status(500).render('error', {
                title: 'Invalid API Response',
                message: 'The trips API returned unexpected data.'
            });
        }

        // Handle empty list
        if (trips.length === 0) {
            return res.status(404).render('error', {
                title: 'No Trips Found',
                message: 'There are currently no trips available.'
            });
        }

        // Render page with live API data
        res.render('travel', {
            title: 'Travlr Getaways',
            active: 'travel',
            trips
        });

    } catch (err) {
        console.error(`[${new Date().toISOString()}] FETCH ERROR in travel: ${err.message}`);

        res.status(500).render('error', {
            title: 'Server Error',
            message: 'Unable to load the trips list.'
        });
    }
};


// GET /travel/:slug → render trip details page
const travelDetails = async (req, res) => {
    const slug = req.params.slug;

    // Validate slug
    if (!slug || typeof slug !== 'string') {
        return res.status(400).render('error', {
            title: 'Invalid Request',
            message: 'Invalid trip URL.'
        });
    }

    try {
        const response = await fetch(`http://localhost:3000/api/trips/details/${slug}`);

        // Check API status
        if (!response.ok) {
            return res.status(response.status).render('error', {
                title: 'Error',
                message: `API returned status ${response.status}.`
            });
        }

        const trip = await response.json();

        // Validate JSON structure
        if (!trip || typeof trip !== 'object') {
            return res.status(500).render('error', {
                title: 'Error',
                message: 'Invalid API response.'
            });
        }

        // Fallbacks for missing fields
        trip.image = trip.image || 'default.jpg';
        trip.description = trip.description || '<p>No description available.</p>';

        res.render('travel-details', {
            title: trip.name || 'Trip Details',
            trip
        });

    } catch (err) {
        console.error(`[${new Date().toISOString()}] FETCH ERROR in travelDetails: ${err.message}`);

        res.status(500).render('error', {
            title: 'Server Error',
            message: 'Unable to load trip details.'
        });
    }
};

module.exports = {
    travel,
    travelDetails
};
