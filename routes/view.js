// Express npm module for requests
const express = require('express');

// Path module for serving content through directory
const path = require('path');

// body-parser module parses body of requests
const bodyParser = require("body-parser");

// Access instance of Express router
let router = express.Router();

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */

/**
 * @api {get} /views Request to get view page
 * @apiName GetView
 * @apiGroup View
 *
 * @apiDescription Gets View - in the form of a served HTML page to handle viewing of data.
 *
 * @apiSuccess (Success 200) {File} result HTML page served to process all endpoints in a user-friendly UI.
 *
 * @apiUse JSONError
 */
router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/view.html'));
});

module.exports = router;