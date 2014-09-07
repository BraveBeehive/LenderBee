'use strict';

var bookshelf = require('../database.js');

var Item = bookshelf.Model.extend({
	tableName: 'inventory',
	initialize: function() {
		this.on('creating', console.log('CREATED NEW ITEM!!!'));
	}
});

module.exports = Item;
