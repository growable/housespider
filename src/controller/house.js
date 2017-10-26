/**
 * get house price info
 */

var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var url = require('url');

function House () {
    this.main = function () {
        this._getList();
    };

    this.test = function () {
        console.log('Test Hello');
    };

    this._getList = function () {
        superagent.get('http://sh.lianjia.com/ershoufang/sijing')
                .end(function(err, res) {
                    if (err) {
                        return next(err);
                    }

                    var $ = cheerio.load(res.text); //jquery
                    var urls = [];

                    $('.js_fang_list li').each(function(idx, element) {
                        var list = $(element);

                        urls.push('http://sh.lianjia.com' + list.children('a').attr('href'));
                        // console.log(list.children('a').attr('href'));
                    });

                    var eq = new eventproxy();

                    eq.after('url_html', urls.length, function(urls) {
                        data = urls.map(function(text) {
                            console.log(urls);
                        });
                    });

                    urls.forEach(function(urls) {
                        superagent.get(urls)
                                .end(function(err, res) {
                                    console.log('fetch' + urls + ' successful');
                                    eq.emit('url_html', [urls, res.text]);
                                });
                    });
                });

    }

}

module.exports = new House();
