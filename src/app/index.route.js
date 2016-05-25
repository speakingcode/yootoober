(function() {
  'use strict';

  angular
    .module('yootoober')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('auth', {
        url: '/auth?access_token',
        controller: function($state, $location, LoginService) {
          //google returns "<redirecturl>#access_token=XXXX&...."
          //we need to strip the value out of the full hash string
          var accessToken = $location.hash().split("access_token=")[1].split("&")[0];
          LoginService.accessToken(accessToken);
          $state.go('home');
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
