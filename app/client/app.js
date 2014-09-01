'use strict';

/**
 * @ngdoc overview
 * @name lenderBeeApp
 * @description
 * # lenderBeeApp
 *
 * Main module of the application.
 */
angular
  .module('lenderBeeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/searchresults', {
        templateUrl: 'client/searchresults/searchresults.html',
        controller: 'searchresultsController'
      })
      .when('/searchbar', {
        templateURL: 'client/search/searchbar.html',
        controller: 'searchbarController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
