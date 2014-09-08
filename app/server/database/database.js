'use strict';

var path = require('path');
// var Bookshelf = require('bookshelf')(knex);
var knex = require('knex')({
  client: 'pg',
  connection: {
    // host: '',
    // host: '127.0.0.1',
    user: 'lenderbee',
    password: 'lenderbee',
    database: 'lenderbee',
    charset: 'utf8'
  }
});
//this is the connection to our database
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

//Creating our schema with the join table
knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('facebookName', 100);
      table.string('facebookEmail', 100);
      table.string('facebookToken', 255);
      table.string('facebookProfileID', 100);
      table.timestamps();
    }).createTable('inventory', function (table) {
      table.increments('id').primary()
      table.string('item', 255);
      table.float('distance');
    }).createTable('inventory_users_lend', function (table) {
      table.increments('id').primary();
      table.integer('users_id').unsigned().references('users.id');
      table.integer('inventory_id').unsigned().references('inventory.id');
      table.integer('borrower_id').unsigned().references('users.id');
    }).then(function (table) {
      console.log('TABLES CREATED:', table)
    })
  }
});
