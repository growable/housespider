
/**
 * [params description]
 * @type {[type]}
 */

'use strict';

var fs = require('fs');

var params = process.argv;

params.splice(0, 2);

if (params.length > 0) {
    var cf = './src/controller/' + params[0] + '.js';

    fs.exists(cf, function(exists) {
        if (exists) {
            var c = require(cf);

            if (params.length > 1) {
                c[params[1]](params.splice(0, 2));
            } else {
                c.main();
            }

        } else {
            console.log('Controller ' + params[0] + ' not exist.');
        }
    });
}
