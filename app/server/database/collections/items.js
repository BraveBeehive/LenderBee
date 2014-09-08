'use strict';

var bookshelf = require('../database.js');
// Bookshelf.plugin('registry')
var Item = require('../models/item.js');

var Items = new bookshelf.Collection();

Items.model = Item;

module.exports = Items;
