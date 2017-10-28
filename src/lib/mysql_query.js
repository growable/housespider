
/**
 * [mysql Mysql db object, connect and close]
 * @type {[type]}
 */
var mysql = require('mysql');

function MysqlQuery () {
    var pool = mysql.createPool({
        host: '192.168.10.128',
        user: 'root',
        password: '123456',
        database:'lianjia',
        port:'3306'
    });

    this.self = function() {
        return pool;
    };


    this.query = function() {
        pool.getConnection(function (err, connection) {
            // Use the connection
            connection.query(sql, function (err, rows) {
                callback(err, rows);
                connection.release();
            });
        });
    };

}

module.exports = new MysqlQuery();
