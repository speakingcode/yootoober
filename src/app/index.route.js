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
      .state('search', {
        url: '/search/:searchQuery?locationFilter&sortOption',
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'searchCtrl'
      })
      .state('video', {
        url: '/videos/:videoId?searchQuery',
        templateUrl: 'app/video/video.html',
        controller: 'VideoController',
        controllerAs: 'videoCtrl'

      })
      .state('favorites', {
        url: '/favorites',
        templateUrl: 'app/favorites/favorites.html',
        controller: 'FavoritesController',
        controllerAs: 'favoritesCtrl'
      })
      .state('auth', {
        url: '/auth',
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
