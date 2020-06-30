// Express npm module for requests
const express = require('express');

// Express instance
const app = express();

// Bodyparser npm module
const bodyParser = require("body-parser");

/**
 * BodyParser URL encoded parsing function.
 */
app.use(bodyParser.urlencoded({
    extended: true,
}));

/**
 * BodyParser JSON parsing function.
 */
app.use(bodyParser.json());

// Path module for managing directory access
const path = require('path');

// Scrape function from utilities
const scraper = require('./utilities/utils.js').scrapeHandler;

app.use(express.static(path.join(__dirname, '/public')));

// "/search" endpoint uses inventory.js
app.use('/data', require('./routes/inventory.js'));

// Base endpoint uses view.js
app.use("/", require('./routes/view.js'));


// Listens for server running.
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
    try {
        (setInterval(scraper, 60000));
    } catch (err) {
        console.log("Error: " + err);
}
});