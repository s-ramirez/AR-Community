(function() {
  'use strict';

  angular
    .module('app')
    .service('GroupService', GroupService);

  GroupService.$inject = ['$http'];

  function GroupService($http) {
    function createGroup(group, users) {
      return $http.post('/api/group', group).then(function(response) {
        if(response) {
          return $http.put('/api/group/'+response.data.id, {group_user : users}).then(function(response) {
            return response.data;
          });
        } else {
          return false;
        }
      })
    }

    function deleteGroup(group) {
      if(group.selected)
        delete group.selected;
      return $http.delete('/api/group/' + group.id);
    }

    return {
      createGroup: createGroup,
      deleteGroup: deleteGroup
    }
  }
})();
