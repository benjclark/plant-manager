var mysql = require('mysql');
var express = require('express');
var nodeadmin = require('nodeadmin');

var app = express();

/**
 *  before running this for the first time you will need to:
 *  1. install mysql
 *  2. start a mysql server with the below user and password configured
 *  3. create a database called plantmanager using a mysql client like oracle's mysql workbench
 */

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'plantmanager'
});

connection.connect((err) => {
    if (err) { throw err; }
    console.log('connected to database');
});

app.use(nodeadmin(app));