(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('VideoService', VideoService);

  /** @ngInject */
  function VideoService(
      $http,
      $localStorage,
      $q,
      LoginService,
      LikeService,
      GOOGLE_API_KEY
  ) {
    var that  = this;

    if (!$localStorage.videos)
      $localStorage.videos = {};

    this.video = function(videoId) {
      var video;
      
      if (!videoId)
        return $q.when([]);

      return that.getVideo(videoId)
        //save video, get comments
      .then(function(response) {
        video = response.data.items[0];
        $localStorage.videos[videoId] = video;
        return that.commentThread(videoId);
      })
        //save comments, get rating
      .then(function(response) {
        $localStorage.videos[videoId].comments = response.data.items;
        return LikeService.rating(videoId);
      }, function(response) {
        return LikeService.rating(videoId);
      })
      .then(function(response) {
        $localStorage.videos[videoId].rating = response.data.items[0].rating;
        return $localStorage.videos[videoId];
      });
    };

    this.getVideo = function(videoId) { 

      if ($localStorage.videos[videoId])
        return $q.when({data: { items: [$localStorage.videos[videoId]]}});

      //get video
      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&id="            + videoId +
        //"&access_token="  + LoginService.accessToken()
        "&key="           + GOOGLE_API_KEY
      );
    };

    this.commentThread = function(videoId) {
      return $http.get(
          "https://www.googleapis.com/youtube/v3/commentThreads" +
          "?part="        + "snippet" +
          "&order="       + "relevance" +
          "&textFormat="  + "html" +
          "&videoId="     + videoId +
          
          "&key="         + GOOGLE_API_KEY
      );
    };

  }
})();
