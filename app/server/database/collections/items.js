'use strict';

var bookshelf = require('../database.js');
var Item = require('../models/item.js');

var Items = new bookshelf.Collection();

Items.model = Item;

module.exports = Items;