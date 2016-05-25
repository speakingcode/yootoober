(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, SearchService) {
    var searchCtrl = this;

    searchCtrl.query = "";
    searchCtrl.videos = SearchService.videos();

    $scope.$watch(
      function() {
        return searchCtrl.query;
      },
      function(newQuery) {
        SearchService.search(newQuery);
      }
    );

    $scope.$watch(
      function(){ return SearchService.videos(); },
      function(newValue) {
        searchCtrl.videos = newValue;
      }
    );
    

  }
})();
