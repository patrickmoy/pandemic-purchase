const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const testUrl = 'https://www.roguefitness.com/rogue-45lb-ohio-powerlift-bar-cerakote';
const testUrl2 = "https://www.roguefitness.com/rogue-vertical-plate-tree-2-0";
const testUrl3 =  "https://www.roguefitness.com/the-volcano";
const testUrl4 = "https://www.repfitness.com/in-stock-items/rep-sled-harness";
const testUrl5 = "https://www.titan.fitness/racks/squat-stands/x-3-series/x-3-short-squat-stand/400423.html";
const testUrl6 = "https://www.roguefitness.com/rogue-calibrated-kg-steel-plates";
const testUrl7 = "https://www.roguefitness.com/rogue-vertical-plate-tree-2-0";
const testUrl8 = "https://www.titan.fitness/strength/dumbbells/urethane/urethane-dumbbells-%7C-5---120-lb-%7C-pair/URDMBL_GROUP.html";

rp(testUrl8)
    .then(html => {
        let itemData = checkStockMultipleItems(html, 'Titan');
        // let itemData = checkStockSingleItem(html, "Rogue");
        console.log(itemData);
    })
    .catch(err => {
        console.log(err);
    });

function checkStockSingleItem(html, type) {
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
            stock: $(".availability.in-stock").text(),
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

function checkStockMultipleItems(html, type) {
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
        $()
    }
    return itemData;
}



