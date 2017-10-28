/**
 * get house price info
 */

var cheerio     = require('cheerio');
var superagent  = require('superagent');
var eventproxy  = require('eventproxy');
var url         = require('url');
var mysql       = require('mysql');
var housefilter = require('../lib/house_filter');
// var db          = require('../config/db');
var housemodel  = require('../model/house_model');

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
                        // return next(err);
                    }

                    var urls = [];

                    //get page house list
                    urls = housefilter.getHouseUrls(res.text);

                    //save list to DB
                    if (urls.length > 0) {
                        housemodel.upInsertHouse(urls);
                    }
                });

    };

    this._getHouseDetail = function() {
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
    }

}

module.exports = new House();
