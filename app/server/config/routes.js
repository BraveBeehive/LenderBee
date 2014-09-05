'use strict';

var util = require('../database/utility.js');

module.exports = function(app, passport) {
  
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
  app.post('/api/inventory/add', function(request, response) {
    console.log('adding item to inventory:', request.body.item);
    util.addItemToInventory(request, response);
  });

  // routing for user to remove item to his/her inventory
  app.post('/api/inventory/remove', function(request, response) {
    console.log('removing item from inventory:', request.body.item);
    util.removeItemFromInventory(request, response);
  });

  // routing for user to lend item to another user
  app.post('/api/inventory/lend', function(request, response) {
    console.log('lending item from inventory:', request.body.item);
    // util.lendItemFromInventory(request, response);
  });

  // routing for user to return item to another user
  app.post('/api/inventory/return', function(request, response) {
    console.log('returning item to owner:', request.body.item);
    // util.returnItemToOwner(request, response);
  });

  // routing for user to demand another user returns his/her item
  app.post('/api/inventory/demand', function(request, response) {
    console.log('demanding item be returned to owner:', request.body.item);
    // util.demandReturnToOwner(request, response);
  });

  // routing for user to see inventory
  app.get('/api/inventory/show', function(request, response) {
    console.log('showing entire inventory');
    response.send(200, [
        {
          name: 'spork',
          owner: 'Tommy', 
          possessor: 'Tommy',
          isRequested: true
        },
        {
          name: 'headphones',
          owner: 'Tommy', 
          possessor: 'Jonathan',
          isRequested: false
        },
        {
          name: 'wrench',
          owner: 'Collin', 
          possessor: 'Tommy',
          isRequested: false
        },
        {
          name: 'bike',
          owner: 'Tommy', 
          possessor: 'Tommy',
          isRequested: false
        }
      ]);

    // util.getInventory(request, response);
  });

  // USER AUTHENTICATION AND LOGOUT

  // for facebook login/authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // handle the callback after facebook has verified the user
  // need to figure out where the response gets sent back to /
  // with what to handle persistent sessions
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(request, response) {
    console.log('user authenticated via facebook');
    response.send(200);
  });

  // handle logout/session end
  // need to figure out how to make sure session is ended
  app.get('/logout', function(request, response) {
    console.log('user is logging out');
    request.logout();
    response.send(200);
  });
};

// UTILITY FUNCTIONS

// Need to build in functionality where user is checked
// to see if he/she is logged in before going to certain sites
// use app.all('/api/*', isLoggedIn)?
var isLoggedIn = function(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  console.log('not logged in');
  response.send(200);
};
