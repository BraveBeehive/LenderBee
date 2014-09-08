'use strict';

var bookshelf = require('./database.js');
// var request = require('request');
var Item = require('./models/item.js');
var User = require('./models/user.js');
var ItemOfUser = require('./models/itemOfUser.js');
var Items = require('./collections/items.js');
var Users = require('./collections/users.js');
var ItemsOfUsers = require('./collections/itemsOfUsers.js');

//HELPER FUNCTIONS
//gets the item id
var getNewItemId = function(req) {
	new Item({item: req.body.item}).fetch().then(function(item) {
		return item.id;
	});
};

//gets the user ID
var getCurrentUserId = function(req) {
	new User({id: req.body.id}).fetch().then(function(user) {
		return user.id;
	});
};


//ADD complete and working
exports.addItemToInventory = function(req, res) {
	//find the item in the data base first
	new Item({item: req.body.item})
	.fetch()
	.then(function(found) {
		if(found) {
			//what else to send back if alredy in inventory?
			console.log('ALREADY IN HERE');
			// res.send(200, req.body);
		}
		else {
			//creating the model to add to the inventory table
			var item = new Item({
				item: req.body.item,
				distance: null//set it to the default users home/location that they specify?
			});
			//saving the item to inventory table
			item.save().then(function(newItem) {
				Items.add(newItem);
				console.log('ITEM SAVED TO INVENTORY');

				//creating the model to add to the join able
				var insertItemIntoJoinTable = new ItemOfUser({
					usersId: req.body.id,
					inventoryId: newItem.id,
					borrowerId: null
				});
				//adding the item to the join table
				insertItemIntoJoinTable.save().then(function(entry) {
					ItemsOfUsers.add(entry);
					res.send(200, entry.attributes);
				});
			});
		}
	});
};

//REMOVE complete and working
exports.removeItemFromInventory = function(req, res) {
	new Item({item: req.body.item})
	.fetch()
	.then(function(item) {
		if(item) {
			new ItemOfUser({usersId: req.body.id, inventoryId: item.id})
			.fetch()
			.then(function(model) {
				if(model) {
					model.destroy()
					.then(function(modelRemoving) {
						ItemsOfUsers.remove(modelRemoving);
						res.send(200, 'removed item association with owner');
					});
				}
				else {
					res.send(200, 'no association with item');
				}
			});
			item.destroy()
			.ten(function(itemRemoving) {
				Items.remove(itemRemoving);
				res.send(200, 'item removed from inventory');
			});
		}
		else {
			res.send(200, 'no item found');
		}
	});
};

//SEARCH complete and working
exports.searchForItemInInventory = function(req, res) {
	//store the search item value
	//select all from inventory where the item is req.body.item;
	new Item({item: req.body.item})
	.where({item: req.body.item})
	//search for the item
	.fetchAll()
	.then(function(item) {
		console.log('received item' + item + 'searching now');
		if(!item) {
			console.log('NO ITEM FOUND');
			res.send(200, false);
		}
		//if there is item
		else {
			console.log('ITEM FOUND', item);
			res.send(200, item);//anything else to send back??
		}
	});
};

//GET INVENTORY is completed and working
exports.getInventory = function(req, res) {
	console.log('in getInventory func');
	new ItemOfUser({
		usersId: req.body.id
	})
	.fetchAll()
	.then(function(item) {
		if(item) {
			item.forEach(function(items) {
				new Item({id: items.attributes.inventoryId})
				.fetch()
				.then(function(model) {
					console.log(model.attributes.item);
					// res.send(200, model.attributes.item);
				});
			});
		}
	});
};

exports.lendItemFromInventory = function(req, res) {
	//get the item id
	new Item({item: req.body.item}).fetch().then(function(item) {
		if(item) {
			//match the item id with the current user id in the join table
			new ItemOfUser({
				usersId: req.body.id
			})
			.fetch()
			.then(function(model) {
				if(model) {
					//set the borrowerId to the person requesting the item
					model.set({
						borrowerId: req.body.borrowerId
					});
					return model.save();
				}
				else {
					console.log('Nothing to lend');
				}
			});
		}
	});
};

exports.returnItemToOwner = function(req, res) {
	//find the item id
	new Item({item: req.body.item}).fetch().then(function(item) {
		if(item) {
			//match the borrowed item id with the current user id and set the borrowerId to null
			new ItemOfUser({
				item: item.id, 
				borrowerId: req.body.id
			})
			.fetch()
			.then(function(model) {
				if(model) {
					model.set({
						borrowerId: null
					});
					return model.save();
				}
				else {
					return(200, false);
				}
			});
		}
	});
};
