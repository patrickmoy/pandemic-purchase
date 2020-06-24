const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const testUrl = 'https://www.roguefitness.com/rogue-45lb-ohio-powerlift-bar-cerakote';
const testUrl2 = "https://www.roguefitness.com/rogue-vertical-plate-tree-2-0";
const testUrl3 =  "https://www.roguefitness.com/the-volcano";
const testUrl4 = "https://www.repfitness.com/in-stock-items/rep-sled-harness";
const testUrl5 = "https://www.titan.fitness/racks/squat-stands/x-3-series/x-3-short-squat-stand/400423.html";

rp(testUrl5)
    .then(html => {
        let itemData = checkStockSingleItem(html, "Titan");
        console.log(itemData[0]);
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

