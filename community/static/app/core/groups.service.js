(function() {
  'use strict';

  angular
    .module('app')
    .service('GroupService', GroupService);

  GroupService.$inject = ['$http'];

  function GroupService($http) {
    function createGroup(group) {
      return $http.post('/api/group', group).then(function(response) {
        if(response) {
          return response.data;
        } else {
          return false;
        }
      })
    }

    return {
      createGroup: createGroup
    }
  }
})();
