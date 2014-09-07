'use strict';

var bookshelf = require('./database.js');
// var request = require('request');
var Item = require('./models/item.js');
var User = require('./models/user.js');
var Items = require('./collections/items.js');
var Users = require('./collections/users.js');

exports.addItemToInventory = function(req, res) {
	// var itemToBeAdded = req.value;
	//find the item in the data base first
	new Item({item: 'juice'})
	.fetch()
	.then(function(found) {
		if(found) {
			console.log('ALREADY IN HERE');
			// res.send(200, found.value);
		}
		else {
			//get the item to be added
			var item = new Item({
				item: 'juice',
				distance: null
			});

			item.save().then(function(newItem) {
				Items.add(newItem);
				// res.send(200, newItem);
				console.log('NEW ITEM SAVED: ', newItem.attributes);
			});
		}
	});
};

exports.removeItemFromInventory = function(req, res) {
	// var itemToBeRemoved = req.value;
	//find the item in the data base first
	new Item({item: 'wrench'})
	.fetch()
	.then(function(found) {
		if(found) {
			var item = new Item({
				item: 'wrench',
				distance: null
			});
			item.destroy().then(function(itemRemoving) {
				Items.remove(itemRemoving);
				res.send(200, itemRemoving);
			});
			res.send(200, found.value);
		}
		else {
			console.log('item not found');
		}
		// else {
		// 	//get the item to be removed
		// 	var item = new Item({
		// 		item: itemToBeRemoved,
		// 		distance: ''
		// 	});

		// 	item.destroy().then(function(itemRemoving) {
		// 		Items.remove(itemRemoving);
		// 		res.send(200, itemRemoving);
		// 	});
		// };
	});
};


exports.searchForItemInInventory = function(req, res) {
	//store the search item value
	// var reqSearchValue = req.value;
	//select all from inventory where the item is req.value;
	console.log('in searchForItemInInventory');
	console.log(req.body);
	new Item({item: req.body.item})
	.where({item: req.body.item})
	//search for the item
	.fetchAll()
	.then(function(item) {
		console.log('received item', item, 'searching now');
		if(!item) {
			console.log('NO ITEM FOUND');
			res.send(200, false);
		}
		//if there is item
		else {
			console.log('ITEM FOUND', item.attributes);
			res.send(200, item);
		}
	});
	// console.log('SEARCH FUNCTION FIRED OFF');
};
