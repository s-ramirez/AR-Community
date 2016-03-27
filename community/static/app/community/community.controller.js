(function() {
  'use strict';

  angular
    .module('app')
    .controller('CommunityController', CommunityController);

  CommunityController.$inject = ['$rootScope','UserService'];

  function CommunityController($rootScope, userService) {
    var vm = this;
    vm.currentUser = userService.getCurrentUser();
    
    $rootScope.font = 14;
    vm.zoom = function(number) {
      $rootScope.font +=number;
    }
  }
})();
