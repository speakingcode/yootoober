(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(LoginService) {
    var vm = this;

    vm.login = function() {
      LoginService.login();
    };
  }
})();
