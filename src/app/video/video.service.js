(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, $localStorage, $q, LoginService, GOOGLE_API_KEY) {
    if (!$localStorage.videos)
      $localStorage.videos = {};

    this.video = function(videoId) {
      var video,
          that = this;

      if (!videoId)
        return $q.when([]);

      if ($localStorage.videos[videoId])
        return $q.when($localStorage.videos[videoId]);

      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&id="            + videoId +
        //"&access_token="  + LoginService.accessToken()
        "&key="           + GOOGLE_API_KEY
      )
      .then(function(response) {
        video = response.data.items[0];
        $localStorage.videos[videoId] = video;
        return that.commentThread(videoId);
      })
      .then(function(response) {
        $localStorage.videos[videoId].comments = response.data.items;
        return $localStorage.videos[videoId];
      });
    };

    this.commentThread = function(videoId) {
      return $http.get(
          "https://www.googleapis.com/youtube/v3/commentThreads" +
          "?part="        + "snippet" +
          "&order="       + "relevance" +
          "&textFormat="  + "html" +
          "&videoId="     + videoId +
          
          "&key="         + GOOGLE_API_KEY
          //"&access_token="  + LoginService.accessToken()
      );
    };
  }
})();
