const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// GET Travel page
const travel = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways',
        active: 'travel',
        trips
    });
};

module.exports = { travel };
