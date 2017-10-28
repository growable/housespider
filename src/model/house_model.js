
/**
 * [HouseModel description]
 * @constructor
 */

var db = require('../lib/mysql_query');

function HouseModel() {
    var pool;

    this.getHouseList = function() {

    };

    //update or insert house data
    this.upInsertHouse = function(urls) {
        if (urls.length > 0) {

            urls.forEach(function(url) {
                var house_id = url.match(/\/([^/]*?)\.html/i);
                if (house_id.length > 0) {
                    console.log(house_id[1]);
                    sql = "INSERT INTO `HouseDetail` (HouserID) VALUES ('1234')";

                    db.query(sql, function(err, result) {
                        if (err) throw err;
                        console.log('1221');
                    });

                }
                console.log('11');
                process.exit();
            });
        }
    };
}

module.exports = new HouseModel();
