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
        controller: function($stateParams) {
          console.log(location.hash.substring(1));
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
