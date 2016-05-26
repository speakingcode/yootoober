(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('SearchService', SearchService);

  /** @ngInject */
  function SearchService($http, LoginService) {
    var _videos = {};

    this.search = function(query) {
      var that = this;

      if (!query)
        return;
      
      if (that.videos()[query])
        return;

      $http.get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video" +
        "&q="             + query +
        "&access_token="  + LoginService.accessToken()
      )
      .success(function(response) {
        that.videos()[query] = response.items;
      });
    };

    this.videos = function(videos) {
      if(arguments.length === 0)
        return _videos;

      _videos = videos;
    };
  }
})();
