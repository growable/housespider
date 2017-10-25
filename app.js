
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

// app.get('/', function(req, res, next){
    superagent.get('http://sh.lianjia.com/ershoufang/sijing')
            .end(function(err, res) {
                if (err) {
                    return next(err);
                }

                var $ = cheerio.load(res.text);

                var items = [];
                // console.log(res);
                $('.js_fang_list li').each(function (idx, element) {
                    var $element = $(element);
                    console.log($element.html());
                });

            });
// });


// app.listen(3001, function() {
//     console.log('app is listen port 3001')
// });
