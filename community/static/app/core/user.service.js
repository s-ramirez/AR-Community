(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {
    var currentUser = null;

    function getCurrentUser() {
      return $http.get('/api/user/2').then(function (response) {
        if(response) {
          currentUser = response.data;
          return currentUser;
        } else {
          return currentUser;
        }
      });
    }

    function getAllUsers() {
      return $http.get('/api/user/').then(function (response) {
        if(response) {
          var temp = response.data.objects;
          var users = [];
          for(var i = 0; i < temp.length; i++) {
            if (temp[i].id != currentUser.id){
              for(var j = 0; j < currentUser.friends.length; j++) {
                if(temp[i].id == currentUser.friends[j].id) {
                  temp[i].wanted = true;
                }
              }
              users.push(temp[i]);
            }
          }
          return users;
        } else {
          return [];
        }
      });
    }

    function addFriends(friends) {
      currentUser.friends = friends;
      return $http.put('/api/user/2', {friends: friends}).then(function (response) {
        return response;
      });
    }

    return {
      getCurrentUser: getCurrentUser,
      getAllUsers: getAllUsers,
      addFriends: addFriends
    }
  }
})();
