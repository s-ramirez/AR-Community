(function() {
  'use strict';

  angular
    .module('app')
    .service('MessageService', MessageService);

  MessageService.$inject = ['$http'];

  function MessageService($http) {
    function getMessages(sender, receiver) {
      return $http.get('/api/message').then(function(response) {
        if(response) {
          var messages = [];
          angular.forEach(response.data.objects, function(value) {
            if((value.user_id == sender && value.rec_user_id == receiver) ||
              (value.rec_user_id == sender && value.user_id == receiver)) {
                messages.push(value);
              }
          });
          return messages;
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
