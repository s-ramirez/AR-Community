(function() {
  'use strict';

  angular
    .module('app')
    .service('MessageService', MessageService);

  MessageService.$inject = ['$http'];

  function MessageService($http) {
    function getMessages() {
      return $http.get('/api/message').then(function(response) {
        if(response) {
          return response.data.objects;
        } else {
          return [];
        }
      })
    }

    function sendMessage(message) {
      return $http.post('/api/message', message).then(function(response) {
        if(response) {
          return true;
        } else {
          return false;
        }
      });
    }

    return {
      getMessages: getMessages,
      sendMessage: sendMessage
    }
  }
})();
