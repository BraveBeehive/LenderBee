'use strict';

var bookshelf = require('../database.js');
var item = require('./item.js');

var User = bookshelf.Model.extend({
	tableName: 'users',
	// hasTimeStamps: true,
	initialize: function() {
		this.on('creating', console.log('CREATED USER!!!'))
	}
});

module.exports = User;