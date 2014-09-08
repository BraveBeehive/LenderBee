'use strict';

/**
 * @ngdoc overview
 * @name lenderBeeApp
 * @description
 * # lenderBeeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('lenderBeeApp', [
    'lenderbee.searchresults',
    'lenderbee.searchbar',
    'lenderbee.services',
    'lenderbee.inventory',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    // console.log('app.config loaded!');
    $routeProvider
      .when('/', {
        redirectTo: '/inventory' // should go to /searchbar. 
      })
      .when('/searchresults', {
        templateUrl: 'searchresults/searchresults.html',
        controller: 'searchresultsController'
      })
      .when('/searchresultsnone', {
        templateUrl: 'searchresultsnone/searchresultsnone.html',
        controller: 'searchresultsController'
      })
      .when('/searchbar', {
        templateUrl: 'search/searchbar.html',
        controller: 'searchbarController'
      })
      .when('/inventory', {
        templateUrl: 'inventory/inventory.html',
        controller: 'InventoryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
