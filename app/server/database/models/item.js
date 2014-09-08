'use strict';

var User = require('./user.js');
var bookshelf = require('../database.js');
var ItemsOfUsers = require('../collections/itemsOfUsers.js');
var Users = require('../collections/users.js');
var Items = require('../collections/items.js');


var Item = bookshelf.Model.extend({
	tableName: 'inventory',
	users: function() {
		return this.belongsTo(User).through(inventory_users_lend);
	}
})

module.exports = Item;
