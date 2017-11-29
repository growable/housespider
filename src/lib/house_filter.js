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


    /**
     * [description]
     * @param  {[type]} html [description]
     * @return {[type]}      [description]
     */
    this.getHouseDetailList = function (html) {
        var details = [];

        var $ = cheerio.load(html);

        $('.js_fang_list li').each(function(idx, element) {
            var list = $(element);

            house_id  = list.find('a.link-hover-green').attr('key').replace(/[\r\n\t]/g,"");
            name = list.find('.prop-title').children('a').text();
            comm = list.find('.info-col.row2-text').children('.laisuzhou').text();
            info = list.find('.info-col.row1-text').text().replace(/[\r\n\t]/g,"");
            year = list.find('.info-col.row2-text').not('a').text().replace('| ', '').replace(/[\r\n\t]/g,"");
            addr = list.find('.property-tag-container').text().replace(/[\r\n\t]/g,"");

            // console.log(year);

            details.push({"house_id":house_id,"name":name,"addr":addr,"info":info,"year":year,"comm":comm});
        });

        return details;
    };
}


module.exports = new HouseFilter();
