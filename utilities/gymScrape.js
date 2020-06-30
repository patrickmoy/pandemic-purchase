
const rp = require('request-promise');

const cheerio = require('cheerio');

const pool = require('./sql.js');

async function topLevelHandler() {
    try {
        let theQuery = "SELECT LookupID, Link, Vendor, Type FROM Lookups";
        pool.query(theQuery)
            .then(result => {
                for (let i = 0; i < result.rows.length; i++) {
                    let source = result.rows[i];
                    searchPage(source.link, source.vendor, source.type, source.lookupid)
                        .then(result => console.log("Updated!"))
                        .catch(err => console.log(err));
                }
            })
            .catch(err => {
                console.log("Link retrieval failed - " + err.detail);
            });
        let notificationQuery = "SELECT Lookups.Link As Hyperlink, Items.Name, Notifications.Email," +
            " Notifications.NotificationID FROM Notifications INNER JOIN Items ON Notifications.ItemID = " +
            "Items.ItemID INNER JOIN Lookups ON Lookups.LookupID = Items.LookupID";
        pool.query(notificationQuery)
            .then(result => {
                for (let i = 0; i < result.rows.length; i++) {
                    sendNotificationEmail(result.rows[i].email, result.rows[i].name, result.rows[i].hyperlink);
                    let deleteQuery = "DELETE FROM NOTIFICATIONS WHERE NotificationID = $1";
                    let deleteValue = [result.rows[i].notificationid];
                    pool.query(deleteQuery, deleteValue)
                        .then(result => {
                            console.log("Notification removed!");
                        })
                        .catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
    } catch (err) {
        console.log("Error: " + err);
    }
}

async function searchPage(url, vendor, pageType, lookupid) {
    await rp(url)
        .then(html => {
            let itemData;
            if (pageType === 'single') {
                itemData = checkStockSingle(html, vendor);
            } else if (pageType === 'multiple') {
                itemData = checkStockMultiple(html, vendor);
            }
            updateLookup(itemData, lookupid);
            return false;
        })
        .catch(err => {
            console.log("Error: " + err);
        });
}

function updateLookup(itemArray, lookupid) {
    for (let j = 0; j < itemArray.length; j++) {
        let newQuery = `INSERT INTO Items (Name, Price, InStock, LookupID) VALUES ($1, $2, $3, $4) ON CONFLICT (Name) DO UPDATE SET Price = $2, InStock = $3`;
        let newValues = [itemArray[j].name, reformatPrice(itemArray[j].price), reformatStock(itemArray[j].stock), lookupid];
        pool.query(newQuery, newValues)
            .then(result => {
                // console.log("Updated: " + itemArray[j].name);
            })
            .catch(err => {
                console.log("Error: " + err.detail);
            });
    }
}

function checkStockSingle(html, type) {
    let itemData = [];
    let $ = cheerio.load(html);
    if (type === 'Rogue') {
        itemData[0] = {
            vendor: type,
            name: $(".product-title").text(),
            stock: $(".product-options-bottom button").text(),
            price: $(".price").text()
        };
    } else if (type === 'Rep') {
        itemData[0] = {
            vendor: type,
            name: $(".product-name > h1[itemprop='name']").text(),
            stock: $(".product-info .availability > span").text(),
            price: $('[itemprop="price"]').attr('content')
        }
    } else if (type === 'Titan') {
        itemData[0] = {
            vendor: type,
            name: $(".h1[itemprop='name']").text(),
            stock: $(".availability-msg > span").text(),
            price: $("[itemprop='price']").attr('content')
        }
    }
    return itemData;
}

function checkStockMultiple(html, type) {
    let itemData = [];
    let $ = cheerio.load(html);
    if (type === 'Rogue') {
        $('.grouped-item').each(function(i) {
            itemData[i] = {
                vendor: type,
                name: $(this).find('.grouped-item-row .item-name').text(),
                stock: $(this).find('.bin-stock-availability').text().trim() || "Available",
                price: $(this).find('.grouped-item-row .item-price').text().trim()
            };
        });
    } else if (type === 'Titan') {
        $('.product-detail.set-item').each(function(i) {
            itemData[i] = {
                vendor: type,
                name: $(this).find(".product-name").text().trim(),
                stock: $(this).find('.availability-msg').text().trim(),
                price: $(this).find('.sales').text().trim() || $(this).find('.price').text().trim()
            };
        });
    } else if (type === 'Rep') {
    }
    return itemData;
}

function reformatPrice (oldPrice) {
    if (oldPrice.indexOf('$') === -1) {
        return '$' + oldPrice;
    } else {
        return oldPrice;
    }
}

function reformatStock (oldStock) {
    let oldStockUpper = oldStock.toUpperCase();
    if (oldStockUpper.includes('NOTIFY ME') || oldStockUpper.includes('OUT OF STOCK')) {
        return 0;
    } else if (oldStockUpper.includes('BACKORDER')) {
        return 2;
    } else if (oldStockUpper.includes('IN STOCK') || oldStockUpper.includes('AVAILABLE')) {
        return 1;
    } else {
        console.log("Error with unrecognized stock string: " + oldStockUpper);
        return -1;
    }
}

// Nodemailer module for email notifications.
const nodemailer = require("nodemailer");

// Transporter object for nodemailer, using gmail client
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_AUTH
    }
});

/**
 * Sends an email via Nodemailer
 * @param from {String} email address of sender (Nodemailer will auto set to gmail account mail)
 * @param receiver {String} email address of recipient
 * @param subj {String} subject line
 * @param textMessage {String} email body text
 */
function sendEmail(from, receiver, subj, textMessage/*, htmlMessage*/) {
    let mailOptions = {
        from: from,
        to: receiver,
        subject: subj,
        text: textMessage/*,
        html: htmlMessage*/
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

/**
 *
 * @param receiver {String} email address of recipient
 * @param itemName {String} name of item
 * @param itemLink {String} link to item page
 */
function sendNotificationEmail(receiver, itemName, itemLink) {
    const subj = "Pandemic Purchase: Item now in stock - " + itemName;

    let emailText = "Hello,\n\nAn item you expressed interest in is now in stock. Please visit the link to purchase it! " +
        "You will no longer receive notifications for this item unless you sign up again. Thank you for using Pandemic Purchase.\n";
    emailText = emailText + itemLink;
    sendEmail(process.env.EMAIL_SENDER, receiver, subj,
        emailText);
}


module.exports = {
    handler: topLevelHandler
};

