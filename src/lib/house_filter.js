/**
 * [cheerio filter house information]
 * @type {[type]}
 */
var cheerio = require('cheerio');

function HouseFilter() {
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
    }
}


module.exports = new HouseFilter();
