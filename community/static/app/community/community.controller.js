(function() {
  'use strict';

  angular
    .module('app')
    .controller('CommunityController', CommunityController);

  CommunityController.$inject = ['$rootScope','UserService'];

  function CommunityController($rootScope, userService) {
    var vm = this;
    vm.currentUser = userService.getCurrentUser();
    vm.users = userService.getAllUsers();

    $rootScope.font = 14;
    vm.zoom = function(number) {
      $rootScope.font +=number;
    }

    vm.selectConversation = function(conv) {
      if(vm.currentConversation)
        vm.currentConversation.selected = false;
      conv.selected = true;  
      vm.currentConversation = conv;
    }
  }
})();
