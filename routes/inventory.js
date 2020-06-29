// Express npm module for requests
const express = require('express');

// Pool connection to SQL database
let pool = require('../utilities/sql.js');

// Access instance of Express router
let router = express.Router();

// body-parser module parses body of requests
const bodyParser = require("body-parser");

//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

/**
 * @api {get} /auth Request to sign a user in the system
 * @apiName GetAuth
 * @apiGroup Auth
 *
 * @apiHeader {String} authorization "username:password" uses Basic Auth
 *
 * @apiSuccess {boolean} success true when the name is found and password matches
 * @apiSuccess {String} message Authentication successful!
 * @apiSuccess {String} token JSON Web Token
 *
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 *
 * @apiError (404: User Not Found) {String} message "User not found"
 *
 * @apiError (400: Invalid Credentials) {String} message "Credentials did not match"
 *
 * @apiError (400: SQL Error) {String} message the reported SQL error details
 */
router.get('/', (req, res) => {
    let theQuery = "SELECT * FROM Items";
    pool.query(theQuery)
        .then(result => {
            res.status(200).send({
                data: result.rows,
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err.detail
            });
        });
});

router.put('/', (req, res) => {
    if (req.query.name) {
        let theQuery = "UPDATE Items SET ItemName = $1";
        const values = [req.query.name];
        pool.query(theQuery, values)
            .then(result => {
                res.send({
                    success: true,
                    message: "Updated!"
                });
            })
            .catch(err => {
                res.status(400).send({
                    message: err.detail
                });
            });
    } else {
        res.status(400).send({
            message: "Missing info!"
        });
    }
});


module.exports = router;