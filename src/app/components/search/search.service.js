(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('SearchService', SearchService);

  /** @ngInject */
  function SearchService($http, $q, LoginService) {
    var _searches = {};

    this.search = function(query, locationFilter = "", sortOption = "relevance") {
      if (!query) {
        return $q.when([]);
      }

      if (_searches[query] && _searches[query][sortOption + locationFilter]) {
        return $q.when(_searches[query][sortOption + locationFilter]);
      }

      return $http.get(
        "https://www.googleapis.com/youtube/v3/search" + 
        "?part="          + "snippet" +
        "&type="          + "video" +
        "&q="             + query +
        (locationFilter ? "&location="  + locationFilter + "&locationRadius=20mi" : "") +
        (sortOption     ? "&order="     + sortOption : "") +
        "&maxResults="    + "50" +
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        console.log(response);
        _searches[query] = _searches[query] || {};
        _searches[query][sortOption + locationFilter] = response.data.items;
        console.log(_searches);
        return _searches[query][sortOption + locationFilter];
      });
    };
  }
})();
