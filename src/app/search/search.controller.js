(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, $state, $stateParams, SearchService) {
    var searchCtrl = this;

    searchCtrl.query          = $stateParams.searchQuery || "";

    searchCtrl.sortOptions    = ["relevance", "date", "rating"];
    searchCtrl.sortOption     = $stateParams.sortOption || "relevance";
    searchCtrl.locationFilter  = decodeURIComponent($stateParams.locationFilter) || "";

    searchCtrl.search = function() {
      SearchService.search(
          searchCtrl.query,
          searchCtrl.locationFilter,
          searchCtrl.sortOption
      )
      .then(function(videos) {
        searchCtrl.videos = videos;
      });
    };

    searchCtrl.doSearch = function() {
      $state.go(
        'search',
        {
          searchQuery: searchCtrl.query,
          sortOption: searchCtrl.sortOption,
          locationFilter: encodeURIComponent(searchCtrl.locationFilter)
        },
        {reload: true}
      );
    };

    searchCtrl.search();
  }
})();
