(function() {
  'use strict';

  angular
    .module('app', [
        'ngRoute',
        'ngMaterial'
    ]).config(config);

  function config($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/app/community/community.html',
        controller: 'CommunityController',
        controllerAs: 'community'
      })
      .otherwise({
        redirectTo: '/'
      });

      $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('orange');
  }
})();
