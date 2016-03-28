(function() {
  'use strict';

  angular
    .module('app')
    .controller('CommunityController', CommunityController);

  CommunityController.$inject = ['$rootScope','$interval','$mdDialog','$mdToast','UserService', 'MessageService', 'GroupService'];

  function CommunityController($rootScope, $interval, $mdDialog, $mdToast, userService, messageService, groupService) {
    $rootScope.font = 14;
    var vm = this;

    vm.getCurrentUser = function () {
      return userService.getCurrentUser().then(function(user) {
        vm.currentUser = user;
        vm.groups = vm.currentUser.groups;
        vm.users = vm.currentUser.friends;
      });
    };

    vm.zoom = function(number) {
      $rootScope.font +=number;
    }

    vm.selectConversation = function(conv) {
      vm.message = "";
      if(vm.currentConversation)
        vm.currentConversation.selected = false;
      conv.selected = true;
      vm.currentConversation = conv;
      vm.loadMessages();
    }

    vm.loadMessages = function () {
      if(vm.currentConversation) {
        messageService.getMessages(vm.currentUser.id, vm.currentConversation.id).then(function (response) {
          if(response) {
            vm.messages = response;
          }
        });
      }
    }

    vm.getUser = function(userId) {
      for(var i = 0; i < vm.users.length; i++) {
        if(vm.users[i].id == userId) {
          return vm.users[i].name;
        }
      }
      return 'None';
    }

    vm.sendMessage = function (content) {
      var message = {
        content: content,
        user_id: vm.currentUser.id
      }
      if(vm.currentConversation.username){
        message.rec_user_id = vm.currentConversation.id;
      } else {
        message.group_id = vm.currentConversation.id;
      }

      messageService.sendMessage(message).then(function(response){
        if(response) {
          vm.message = "";
          vm.loadMessages();
        }
      });
    }

    vm.showToast = function(content) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(content)
          .position({top: false, right: false, left: true, bottom: true})
          .hideDelay(3000)
      );
    };

    vm.showDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/static/app/community/dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false
      })
      .then(function(group) {
        var newGroup = {
          name: group.name,
          user_id: vm.currentUser.id
        }
        group.users.push(vm.currentUser);
        groupService.createGroup(newGroup, group.users).then(function(response) {
          vm.getCurrentUser();
          vm.showToast('Group created succesfully!');
        });
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    }

    vm.showFriendDialog = function(ev) {
      $mdDialog.show({
        controller: FriendDialogController,
        templateUrl: '/static/app/community/friend.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false
      })
      .then(function(friends) {
        userService.addFriends(friends).then(function(response) {
          vm.getCurrentUser();
          vm.showToast('Friends updated succesfully!');
        });
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    }
    vm.init = function() {
      vm.getCurrentUser();
    };
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
    $scope.createGroup = function() {
      var group = {
        name: $scope.name,
        users: []
      };
      for(var i = 0; i < $scope.users.length; i++) {
        if($scope.users[i].wanted) {
          delete $scope.users[i].wanted;
          group.users.push($scope.users[i]);
        }
      }
      $mdDialog.hide(group);
    };
  }

    function FriendDialogController($scope, $mdDialog, UserService) {
      UserService.getAllUsers().then(function(users) {
        $scope.users = users;
      });
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.addFriends = function() {
        var friends = [];
        for(var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].wanted) {
            delete $scope.users[i].wanted;
            friends.push($scope.users[i]);
          }
        }
        $mdDialog.hide(friends);
      };
    }
})();
