const mysql = require('mysql');
const db =mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'db_test_meteor',
    multipleStatements: true
});
db.connect();
module.exports = db;