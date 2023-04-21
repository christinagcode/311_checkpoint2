let mysql = require("mysql");
require("dotenv").config();

let connection = mysql.createConnection({
    "host": process.env.DB_HOSTNAME,
    "user": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT
})

connection.query("select now()", function(err, results){
    if(err){
        console.log("Connection to database failed", err);
    } else {
        console.log("Connection to database passed", results);
    }
});

module.exports = connection;