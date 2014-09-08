'use strict';

var bookshelf = require('../database.js');
// Bookshelf.plugin('registry');
var Item = require('../models/item.js');
var User = require('../models/user.js');
var ItemOfUser = require('../models/itemOfUser.js');


var ItemsOfUsers = new bookshelf.Collection();

ItemsOfUsers.model = ItemOfUser;

module.exports = ItemsOfUsers;
