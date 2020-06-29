// Express npm module for requests
const express = require('express');

// Express instance
const app = express();

// Bodyparser npm module
const bodyParser = require("body-parser");

// Scrape function from utilities
const scraper = require("./utilities/utils.js").scrapeHandler;

// "/search" endpoint uses inventory.js
app.use('/data', require('./routes/inventory.js'));

app.get("/", (request, response) => {
    //this is a Web page so set the content-type to HTML
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h' + 3 + ' style="color:black">TEST</h' + 3 + '>');
    response.write('<h' + 6 + ' style="color:blue">Patrick Moy</h' + 6 + '>');
    response.end(); //end the response
});

// Listens for server running.
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
    try {
        (setInterval(scraper, 60000));
    } catch (err) {
        console.log("Error: " + err);
}
});