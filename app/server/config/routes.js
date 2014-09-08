'use strict';

var util = require('../database/utility.js');

// UTILITY FUNCTIONS

// Persistent sessions currently not working
// Temporarily returning true no matter what for testing
// Once sessions are persistent, the code can be uncommented
var isLoggedIn = function(request, response, next) {
  // if (request.isAuthenticated()) {
    return next();
  // } else {
    // console.log('not logged in');
    // response.send(404, 'user is not logged in.');
  // }
};


module.exports = function(app, passport) {
  
  var dummyData = [
    {
      id: 0,
      name: 'spork',
      owner: 'Tommy', 
      possessor: 'Tommy',
      isRequested: true
    },
    {
      id: 1,
      name: 'headphones',
      owner: 'Tommy', 
      possessor: 'Jonathan',
      isRequested: false
    },
    {
      id: 2,
      name: 'wrench',
      owner: 'Collin', 
      possessor: 'Tommy',
      isRequested: false
    },
    {
      id: 3,
      name: 'bike',
      owner: 'Tommy', 
      possessor: 'Tommy',
      isRequested: false
    }
  ];

  // just for testing; checks if any request has been made to the server
  // feel free to comment out in later builds
  app.use(function(request, response, next) {
    console.log('A request has been made to the server');
    next();
  });

  // INVENTORY SEARCHING AND MANAGEMENT

  // routing for searchbar to search if item is in inventory
  app.post('/api/search', function(request, response) {
    console.log('searching for item:', request.body.item);
    util.searchForItemInInventory(request, response);
  });

  // routing for user to add item to his/her inventory
  app.post('/api/inventory/add', isLoggedIn, function(request, response) {
    console.log('adding item to inventory:', request.body.item);
    // util.addItemToInventory(request, response);
    request.body.item.id = dummyData.length;
    dummyData.push(request.body.item);
    response.status(201).send(request.body.item);
  });

  // routing for user to remove item to his/her inventory
  app.post('/api/inventory/remove', isLoggedIn, function(request, response) {
    console.log('removing item from inventory', request.body.item); 
    // util.removeItemFromInventory(request, response);
    console.log('dummyData pre-deletion for reference:',dummyData);   
    dummyData.splice(request.body.item.id, 1, null);
    response.status(204).send(); //204: no content
  });

  // routing for user to lend item to another user
  app.post('/api/inventory/lend', isLoggedIn, function(request, response) {
    console.log('lending item from inventory:', request.body.item);
    // util.lendItemFromInventory(request, response);
  });

  // routing for user to return item to another user
  app.post('/api/inventory/return', isLoggedIn, function(request, response) {
    console.log('returning item to owner:', request.body.item);
    // util.returnItemToOwner(request, response);
  });

  // routing for user to demand another user returns his/her item
  app.post('/api/inventory/demand', isLoggedIn, function(request, response) {
    console.log('demanding item be returned to owner:', request.body.item);
    // util.demandReturnToOwner(request, response);
  });

  // routing for user to see inventory
  app.get('/api/inventory/show', isLoggedIn, function(request, response) {
    console.log('showing entire inventory');
    // util.getInventory(request, response);
    response.status(200).send(dummyData.filter(function(item){return item!==null;}));
  });

  // USER AUTHENTICATION AND LOGOUT

  // for facebook login/authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // handle the callback after facebook has verified the user
  // need to figure out where the response gets sent back to /
  // with what to handle persistent sessions
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(request, response) {
    console.log('user authenticated via facebook');
    response.send(200, request.user.attributes);
  });

  // handle logout/session end
  // need to figure out how to make sure session is ended
  app.get('/logout', function(request, response) {
    console.log('user is logging out');
    request.logout();
    response.send(200);
  });
};

