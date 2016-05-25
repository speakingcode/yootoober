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
          var accessToken = $location.hash().split("access_token=")[1].split("&")[0];
          LoginService.accessToken(accessToken);
          $state.go('home');
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
