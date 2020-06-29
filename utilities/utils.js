// Pool connection to SQL database
let pool = require('./sql.js');

// Access to scraping functions
let scrapeHandler = require('./gymScrape.js').handler;

module.exports = {
    pool, scrapeHandler
};