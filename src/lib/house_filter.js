/**
 * [cheerio filter house information]
 * @type {[type]}
 */
var cheerio = require('cheerio');

function HouseFilter() {
    /**
     * [description]
     * @param  {[type]} html [description]
     * @return {[type]}      [description]
     */
    this.getHouseUrls = function(html) {
        // console.log(html)
        var $    = cheerio.load(html); //jquery
        var urls = [];

        $('.js_fang_list li').each(function(idx, element) {
            var list = $(element);

            urls.push(list.children('a').attr('href'));
            // console.log(list.children('a').attr('href'));
        });

        return urls;
    };

    /**
     * [$ description]
     * @type {[type]}
     */
    this.getHouseListPrice = function(html) {
        var $    = cheerio.load(html); //jquery
        var prices = [];

        var price     = 0;
        var per_price = 0;
        var house_id  = '';

        $('.js_fang_list li').each(function(idx, element) {
            var list = $(element);

            price     = list.find('span.total-price').text().replace(/[\r\n\t]/g,"");
            per_price = list.find('span.minor').text().replace(/[\r\n\t]/g,"");
            house_id  = list.find('a.link-hover-green').attr('key').replace(/[\r\n\t]/g,"");
            
            prices.push({"house_id":house_id,"price":price,"per_price":per_price});
        });

        return prices;
    };
}


module.exports = new HouseFilter();
