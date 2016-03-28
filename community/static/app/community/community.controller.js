(function() {
  'use strict';

  angular
    .module('app')
    .controller('CommunityController', CommunityController);

  CommunityController.$inject = ['$rootScope','$interval','$mdDialog','UserService', 'MessageService'];

  function CommunityController($rootScope, $interval, $mdDialog, userService, messageService) {
    $rootScope.font = 14;
    var vm = this;

    vm.init = function() {
      userService.getCurrentUser().then(function(user) {
        vm.currentUser = user;
        vm.groups = vm.currentUser.groups;

        userService.getAllUsers().then(function(users) {
          vm.users = users;
        });
      });
    }

    vm.zoom = function(number) {
      $rootScope.font +=number;
    }

    vm.selectConversation = function(conv) {
      vm.message = "";
      if(vm.currentConversation)
        vm.currentConversation.selected = false;
      conv.selected = true;
      vm.currentConversation = conv;
    }

    vm.loadMessages = function () {
      messageService.getMessages().then(function (response) {
        if(response) {
          vm.messages = response;
        }
      });
    }

    vm.sendMessage = function (content) {
      var message = {
        content: content,
        user_id: vm.currentUser.id
      }
      messageService.sendMessage(message).then(function(response){
        if(response) {
          vm.message = "";
          vm.loadMessages();
        }
      });
    }
    vm.showDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/static/app/community/dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false
      })
      .then(function(answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    }

    vm.init();
    $interval(function () { vm.loadMessages() }, 5000);
  }

  function DialogController($scope, $mdDialog, UserService) {
    UserService.getAllUsers().then(function(users) {
      $scope.users = users;
    });
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})();
