(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {
    var currentUser = {username: "sramirez", name: "Sebastian Ramirez", image_url: "https://lh6.googleusercontent.com/-m32wN5pQw2Q/VhMsTWsKJDI/AAAAAAAALWM/1anmFkVxmNU4wvCURz-QmAf1ZxPAVjmyA/s722-no/IMG_0858.JPG"};

    function getCurrentUser() {
      return currentUser;
      // return $http.get('/api/user/1', function (user) {
      //   if(user) {
      //     return user;
      //   } else {
      //     return null;
      //   }
      // });
    }

    function getAllUsers() {
      return [{"username": "mcarranza", "name": "Melisa Carranza", "image_url": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/10505565_10204985662634140_2419462868959061599_n.jpg?oh=bf18cf43297e4f03b4f1cd7bee806256&oe=578EFC12"}, {"username": "jsuggs", "name": "Joel Suggs", "image_url": "https://lh4.googleusercontent.com/-l-b5CPgUOYM/VPSsR3-nyZI/AAAAAAAAAFo/_Q9mGrsPGlsBeCZvxxC4eODOdJTzW9hVw/s722-no/7cccb589-c056-4cbb-baa4-0d6d99c542d4"}];
    }

    return {
      getCurrentUser: getCurrentUser,
      getAllUsers: getAllUsers
    }
  }
})();
