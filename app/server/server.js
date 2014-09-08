'use strict';

// CONFIGURATION====================================================
// Base set-up where packages, modules, and other files are required.
// Require Express for server configuration, routing, etc.
var express = require('express');

// Define app using Express and port for securing server connection
var app = express();
var port = process.env.PORT || 7432;

// Require Passport and associated resources to handle user authentication
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var flash = require('connect-flash');

// Require middleware
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

require('./config/passport')(passport); // pass passport for configuration

// Set up and configure Express application
// Use bodyParser to handle JSON objects
// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cookierParser to provide and parse cookies
// https://github.com/expressjs/cookie-parser
app.use(cookieParser());

// Use morgan for request logging
// https://github.com/expressjs/morgan
app.use(morgan('dev'));

// Set up and configure Passport
app.use(session({ secret: 'ilovelenderbee' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions after successful authentication
app.use(flash()); 

// Set up static file-routing (needs to be relative path to base index.html from /config/routes.js)
app.use(express.static(__dirname + '../../client')); 
app.use('/bower_components', express.static(__dirname + '../../../bower_components'));

require('./config/routes.js')(app, passport);

// DATABASE CONFIGURATION/CONNECTION ===============================
//Bookshelf and Knex
var bookshelf = require('./database/database.js');
var pg = require('pg');
var conString = 'postgres://lenderbee:lenderbee@localhost:7432/lenderbee';
var client = new pg.Client(conString);
//connect to database;
client.connect();

// Open server connection===========================================
app.listen(port);
console.log('Server now open and listening on port:', port);
