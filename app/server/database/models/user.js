'use strict';

var bookshelf = require('../database.js');
var Item = require('./item.js');
var ItemOfUser = require('./itemOfUser.js');
var Users = require('../collections/users.js');
var ItemsOfUsers = require('../collections/itemsOfUsers.js');
var Items = require('../collections/items.js');
var LendTo = require('./lendTo.js');

var User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true,

	items: function() {
		return this.hasMany(Item).through(inventory_users_lend);
	}

});

module.exports = User;
