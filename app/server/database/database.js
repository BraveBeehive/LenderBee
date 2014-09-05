'use strict';

var path = require('path');
// var Bookshelf = require('bookshelf')(knex);
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'lenderbee',
    charset: 'utf8'
  }
});
//this is the connection to our database
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('facebookName', 100);
      table.string('facebookEmail', 100);
      table.string('facebookToken', 255);
      table.string('facebookProfileID', 100);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table USERS: ', table);
    });
  }
});

knex.schema.hasTable('inventory').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('inventory', function (table) {
      table.increments('id').primary();
      table.string('item', 255);
      table.float('distance');
    }).then(function (table) {
      console.log('Created Table INVENTORY: ', table);
    });
  }
});

knex.schema.hasTable('items of users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('items of users', function (table) {
      table.increments('id').primary()
      table.integer('user').unsigned()
        .references('id')
        .inTable('users');
      table.integer('item').unsigned()
        .references('id')
        .inTable('inventory')
    }).then(function (table) {
      console.log('Created Table INVENTORY: ', table);
    });
  }
});
