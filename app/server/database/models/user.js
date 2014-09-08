'use strict';

var bookshelf = require('../database.js');
var Item = require('./item.js');
var ItemOfUser = require('./itemOfUser.js');
var Users = require('../collections/users.js');
var itemsOfUsers = require('../collections/itemsOfUsers.js');
var Items = require('../collections/items.js');
// var LendTo = require('./lendTo.js');

var User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,

	items: function() {
		return this.hasMany(Item).through(bookshelf.inventoryUsersLend);
	}

});

module.exports = User;
