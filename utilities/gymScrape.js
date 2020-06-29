
const rp = require('request-promise');

const cheerio = require('cheerio');

const pool = require('./sql.js');

async function topLevelHandler() {
    try {
        let theQuery = "SELECT LookupID, Link, Vendor, Type FROM LOOKUPS";
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
        $('.grouped-item').each(function(i, element) {
            itemData[i] = {
                vendor: type,
                name: $(this).find('.grouped-item-row .item-name').text(),
                stock: $(this).find('.bin-stock-availability').text().trim() || "Available",
                price: $(this).find('.grouped-item-row .item-price').text().trim()
            };
        });
    } else if (type === 'Titan') {
        $('.product-detail.set-item').each(function(i, element) {
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

module.exports = {
    handler: topLevelHandler
};

