(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, $q, LoginService) {
    var _videos = {};

    this.video = function(videoId) {
      if (!videoId)
        return $q.when([]);

      if (_videos[videoId])
        return $q.when(_videos[videoId]);

      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&id="            + videoId +
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        _videos[videoId] = response.data.items[0];
        return _videos[videoId];
      });
    };
  }
})();
