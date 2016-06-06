(function() {
  'use strict';

  angular
    .module('yootoober')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
      },
      controller: NavbarController,
      controllerAs: 'navCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(LoginService, LikeService) {
      var navCtrl = this;
      
      navCtrl.isLoggedIn = function() {
        return LoginService.isLoggedIn();
      };

      LikeService.likes().then(function(response) {
        navCtrl.likeCount = response.length;
      });
    }
  }

})();
