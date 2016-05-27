(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('SearchService', SearchService);

  /** @ngInject */
  function SearchService($http, $q, LoginService) {
    var _searches = {};

    this.search = function(query) {

      if (!query) {
        return $q.when([]);
      }

      if (_searches[query]) {
        return $q.when(_searches[query]);
      }

      return $http.get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video" +
        "&q="             + query +
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        console.log(response);
        _searches[query] = response.data.items;
        console.log(_searches);
        return _searches[query];
      });
    };
  }
})();
