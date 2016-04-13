'use strict';

/**
 * @ngdoc overview
 * @name composeUiApp
 * @description
 * # composeUiApp
 *
 * Main module of the application.
 */
angular
  .module('composeUiApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        access: {restricted: true}
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        access: {restricted: false}
      })
      .when('/logout', {
        controller: 'logoutController',
        access: {restricted: true}
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'registerController',
        access: {restricted: false}
      })
      .when('/project/:id', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        access: {restricted: true}
      })
      .when('/project/:id/:container', {
        templateUrl: 'views/container.html',
        controller: 'ContainerCtrl',
        access: {restricted: true}
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        access: {restricted: true}
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
      function (event, next, current) {
        AuthService.getUserStatus();
        if (next.access.restricted &&
            !AuthService.isLoggedIn()) {
          $location.path('/login');
          $route.reload();
        }
    });
  })

  .filter('trim', function () {
    return function (s, n) {
      var sTrim = s.trim();
      var sLimit = sTrim.substring(0, n);
      return sLimit.length < sTrim.length ? sLimit + '...' : sLimit;
    };

  });
