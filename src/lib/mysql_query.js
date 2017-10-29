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

    this.escape = function(param) {

        return pool.escape(param);
    }

    /**
     * [description]
     * @param  {[string]}   sql    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    this.query = function(sql, callback) {

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            // Use the connection
            connection.query(sql, function (err, rows, fields) {
                callback(err, rows, fields);
                connection.release();
            });
        });
    };

}

module.exports = new MysqlQuery();
