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
      })
      .when('/searchresults', {
        templateUrl: 'searchresults/searchresults.html',
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
