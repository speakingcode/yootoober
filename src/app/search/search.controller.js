(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, $state, $stateParams, SearchService) {
    var searchCtrl = this;

    searchCtrl.query  = $stateParams.searchQuery || "";

    searchCtrl.search = function() {
      SearchService.search(searchCtrl.query)
      .then(function(videos) {
        console.log('then!');
        console.log(videos);
        searchCtrl.videos = videos;
      });
    };

    searchCtrl.doSearch = function() {
      $state.go('search', {searchQuery: searchCtrl.query});
    };

    searchCtrl.search();
  }
})();
