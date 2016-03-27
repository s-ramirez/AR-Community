(function() {
  'use strict';

  angular
    .module('app', [
        'ngTouch',
        'ngRoute'
    ]).config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/app/community/community.html',
        controller: 'CommunityController',
        controllerAs: 'community'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
