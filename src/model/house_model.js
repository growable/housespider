
/**
 * [HouseModel description]
 * @constructor
 */

var db = require('../lib/mysql_query');
var moment = require('moment');

function HouseModel() {

    this.getHouseList = function() {

    };

    //update or insert house data
    this.upInsertHouse = function(urls) {
        if (urls.length > 0) {
            var curr = this;
            var currdb = db;

            urls.forEach(function(url) {
                var house_id = url.match(/\/([^/]*?)\.html/i);
                if (house_id.length > 0) {

                    sql = 'SELECT * FROM HouseDetail WHERE HouseID = \''+house_id[1]+'\'';

                    db.query(sql, function(err, result, fields) {
                        if (err) throw err;

                        if (result.length === 0) {
                            curr._insertHouseDetail(currdb.escape(house_id[1]), currdb.escape(url));
                        } else if (result.length === 1) {
                            console.log('need update')
                        }
                    });

                }
                // process.exit();
            });
        }
    };

    /**
     * [exports description]
     * @type {HouseModel}
     */
    this._insertHouseDetail = function(house_id, house_url) {
        sql = "INSERT INTO `HouseDetail` (`HouseID`,`HouseURL`) "
                + " VALUES ("+house_id+", "+house_url+")";
        db.query(sql, function(err, result, fields) {
            if (err) throw err;

            console.log('add' + house_id);
        });
    };


    this._updateHouseDetail = function() {

    };


    /**
     * [description]
     * @param  {[type]} prices [description]
     * @return {[type]}        [description]
     */
    this.upInsertHousePrice = function(prices) {
        if (prices.length > 0) {
            var curr = this;
            var today  = moment().format('YYYY-MM-DD');

            prices.forEach(function(price) {

                sql = "SELECT * FROM HousePrice WHERE HouseID = " + db.escape(price.house_id)
                        +" AND Date = '"+today+"'";

                db.query(sql, function(err, result, fields) {
                    if (err) throw err;

                    if (result.length === 0) {
                        curr._insertHousePrice(price);
                    } else if (result.length === 1) {
                        console.log('need update')
                    }
                });


                // process.exit();
            });
        }
    };


    /**
     * [description]
     * @param  {[type]} prices [description]
     * @return {[type]}       [description]
     */
    this._insertHousePrice = function(prices) {
        var house_id = db.escape(prices.house_id);
        var price    = db.escape(prices.price);
        var per_price= db.escape(prices.per_price);
        var today    = moment().format('YYYY-MM-DD');
        var update_time  = moment().format('YYYY-MM-DD HH:mm:ss');

        sql = "INSERT INTO HousePrice (HouseID,TotalPrice, PerPrice, Date, UpdateTime)"
                + " VALUES ("+house_id+","+price+","+per_price+",'"+today+"','"+update_time+"')";

        db.query(sql, function(err, result, fields) {
            if (err) throw err;

            console.log('add house price:' + house_id + ', date:' + today);
        });
    };

    /**
     * [description]
     * @param  {[type]} details [description]
     * @return {[type]}         [description]
     */
    this.upInsertHouseDetail = function(details) {
        if (details.length > 0) {
            var curr = this;
            var today  = moment().format('YYYY-MM-DD');

            details.forEach(function(data) {

                sql = "SELECT * FROM HouseDetail WHERE HouseID = " + db.escape(data.house_id);

                db.query(sql, function(err, result, fields) {
                    if (result.length === 0) {
                        curr._insertHouseDetail(data);
                    } else if (result.length === 1) {
                        curr._updateHouseDetail(data);
                    }
                })
            });
        }
    }

    /**
     * [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    this._insertHouseDetail = function (data) {
        if (data.length != 6) return ;
        var info = data['info'].split('|');

        type  = info[0] ? info[0] : '';
        area  = info[1] ? info[1] : '';
        floor = info[2] ? info[2] : '';
        head  = info[3] ? info[3] : '';

        sql = "INSERT INTO HouseDetail(HouseID,HouseName,Address,Type,Area,Floor,BuildHead,CommunityName,BuildYear)"
            + " VALUES ("+db.escape(data.house_id)+","+db.escape(data.name)+","+db.escape(data.addr)+","
                        +db.escape(type)+","+db.escape(area)+","+db.escape(floor)+","+db.escape(head)+","+
                        db.escape(data.comm)+","+db.escape(data.year)+")";

        db.query(sql, function(err, result, fields) {
            if (err) throw err;

            console.log('add house detail:' + data.house_id);
        });
    }


    /**
     * [description]
     * @return {[type]} [description]
     */
    this._updateHouseDetail = function(data) {
        info = data.info.split('|');

        type  = info[0] ? info[0] : '';
        area  = info[1] ? info[1] : '';
        floor = info[2] ? info[2] : '';
        head  = info[3] ? info[3] : '';

        sql = "UPDATE HouseDetail SET HouseName = "+db.escape(data.name)+",Address=" + db.escape(data.addr) +
                    ", Type=" + db.escape(type) + ", Area=" + db.escape(area) + ", Floor=" + db.escape(floor) +
                    ", BuildHead = " + db.escape(head) + ",CommunityName = " + db.escape(data.comm) +
                    ",BuildYear = " + db.escape(data.year) +
                " WHERE HouseID = " + db.escape(data.house_id);
        db.query(sql, function(err, result, fields) {
            if (err) throw err;

            console.log('update house detail:' + data.house_id);
        });
    }
}

module.exports = new HouseModel();
