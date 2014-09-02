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
    'searchresults',
    'searchbar',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    console.log('app.config loaded!');
    $routeProvider
      .when('/', {
      })
      .when('/searchresults', {
        templateUrl: 'searchresults/searchresults.html',
        controller: 'srController'
      })
      .when('/searchbar', {
        templateURL: 'search/searchbar.html',
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
