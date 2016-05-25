(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(LoginService) {
    var mainCtrl = this;

    mainCtrl.login = function() {
      LoginService.login();
    };
  }
})();
