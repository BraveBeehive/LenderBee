'use strict';

var bookshelf = require('../database.js');
var Item = require('./item.js');
var User = require('./user.js');
// var LendTo = require('./lendTo.js');

//There will can be multiple user models attached to this table
//the primary id column from the users table will appear more
//than once in the inventory_users table
var ItemOfUser = bookshelf.Model.extend({
	tableName: 'inventory_users_lend',
	user: function() {
		return this.hasMany(User);
	},
	item: function() {
		return this.hasMany(Item);
	},
});

module.exports = ItemOfUser;
