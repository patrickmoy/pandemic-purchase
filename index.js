// Express npm module for requests.
const express = require('express');

// Express instance
const app = express();

// Bodyparser npm module.
const bodyParser = require("body-parser");

const searchFunction = require("./utilities/gymScrape").searchPage;

// // "/search" endpoint uses search.js.
// app.use('/search', require('./routes/search.js'));

// Listens for server running.
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
    try {
        (setInterval(testHandler, 5000));
    } catch (err) {
        console.log("Error: " + err);
    }
});

async function testHandler() {
    try {
        const testUrl = "https://www.titan.fitness/strength/dumbbells/urethane/urethane-dumbbells-%7C-5---120-lb-%7C-pair/URDMBL_GROUP.html";
        searchFunction(testUrl, "Titan", "multiple").then(items => console.log(items));
    } catch (err) {
        console.log("Error: " + err);
    }
}

async function scrapeHandler() {

}