(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('FavoritesController', FavoritesController);

  /** @ngInject */
  function FavoritesController(
      LikeService,
      VideoService
  ){
    var favoritesCtrl = this;
    
    LikeService.likes()
    .then(function(likes) {
      favoritesCtrl.favs = likes; 
    });
    
    
  }
})();
