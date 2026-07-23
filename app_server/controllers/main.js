// Helper to reduce repetition
const renderPage = (res, view, title, active) => {
    res.render(view, { title, active });
};

// Static page controllers
const index   = (req, res) => renderPage(res, 'index',   'Travlr Getaways', 'home');
const about   = (req, res) => renderPage(res, 'about',   'About Travlr',    'about');
const contact = (req, res) => renderPage(res, 'contact', 'Contact Us',      'contact');
const meals   = (req, res) => renderPage(res, 'meals',   'Meals',           'meals');
const news    = (req, res) => renderPage(res, 'news',    'News',            'news');
const rooms   = (req, res) => renderPage(res, 'rooms',   'Rooms',           'rooms');

module.exports = { index, about, contact, meals, news, rooms };
