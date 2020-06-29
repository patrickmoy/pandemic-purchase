// Express npm module for requests
const express = require('express');

// Express instance
const app = express();

// Bodyparser npm module
const bodyParser = require("body-parser");

const scraper = require("./utilities/utils.js").scrapeHandler;

// "/search" endpoint uses inventory.js
app.use('/data', require('./routes/inventory.js'));

// Listens for server running.
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
    try {
        (setInterval(scraper, 10000));
    } catch (err) {
        console.log("Error: " + err);
    }
});