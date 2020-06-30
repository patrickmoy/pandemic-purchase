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
    res.type("application/json");
    // let theQuery = "SELECT * FROM Items";
    let theQuery = "SELECT Lookups.Link, Items.ItemID, Lookups.Vendor, Items.Name, Items.Price, Items.InStock FROM Items LEFT JOIN Lookups ON Items.LookupID = Lookups.LookupID ORDER BY Items.ItemID";
    pool.query(theQuery, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).send(result.rows);
    })
});

/**
 * @api {put} /auth Request to sign a user in the system
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
router.put('/', (req, res, next) => {
    res.type("application/json");
    if (!req.query.id || !req.query.email || isNaN(req.query.id) || !req.query.email.includes('@')) {
        res.status(400).send({
            message: "Invalid input parameters - make sure email is a real email, and that the ID is a number from the list"
        });
    } else {
        let validIdQuery = "SELECT * FROM Items WHERE ItemID = $1";
        let values = [req.query.id];
        pool.query(validIdQuery, values)
            .then(result => {
                if (result.rowCount == 0) {
                    res.status(400).send({
                        message: "Item ID is not valid"
                    });
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(400).send({
                    message: "Database error - contact developer"
                });
            });
    }
}, (req, res, next) => {
        let checkQuery = "SELECT * FROM Notifications WHERE ItemID = $1 AND Email = $2";
        let values = [req.query.id, req.query.email];
        pool.query(checkQuery, values)
            .then(result => {
                if (result.rowCount > 0) {
                    res.status(400).send({
                        message: "You are already signed up for this notification"
                    });
                } else {
                    next();
                }
            }).catch(error => {
                res.status(400).send({
                    message: "Database error - contact developer"
                });
        });
}, (req, res) => {
    let theQuery = "INSERT INTO Notifications (ItemID, Email) VALUES ($1, $2)";
    let values = [req.query.id, req.query.email];
    pool.query(theQuery, values, (error, result) => {
        if (error) {
            res.status(400).send({
                message: "Database error - contact developer"
            });
        }
        res.status(200).send({
            message: "Success!"
        });
    })
});

module.exports = router;