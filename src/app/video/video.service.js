(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, $localStorage, $q, LoginService) {
    if (!$localStorage.videos)
      $localStorage.videos = {};

    this.video = function(videoId) {
      if (!videoId)
        return $q.when([]);

      if ($localStorage.videos[videoId])
        return $q.when($localStorage.videos[videoId]);

      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&id="            + videoId +
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        $localStorage.videos[videoId] = response.data.items[0];
        return $localStorage.videos[videoId];
      });
    };
  }
})();
