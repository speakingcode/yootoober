(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, $localStorage, $q, LoginService, GOOGLE_API_KEY) {
    var favorites = [],
        that = this;

    if (!$localStorage.videos)
      $localStorage.videos = {};

    this.video = function(videoId) {
      var video;

      if (!videoId)
        return $q.when([]);

      if ($localStorage.videos[videoId])
        return $q.when($localStorage.videos[videoId]);

      //get video
      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&id="            + videoId +
        //"&access_token="  + LoginService.accessToken()
        "&key="           + GOOGLE_API_KEY
      )
        //save video, get comments
      .then(function(response) {
        video = response.data.items[0];
        $localStorage.videos[videoId] = video;
        return that.commentThread(videoId);
      })
        //save comments, get rating
      .then(function(response) {
        $localStorage.videos[videoId].comments = response.data.items;
        return that.rating(videoId);
      })
      .then(function(response) {
        $localStorage.videos[videoId].rating = response.data.items[0].rating;
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
      );
    };

    this.likes = function() {
      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&myRating="      + "like" +
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        likes = response.data.items;
        return likes;
      });
    };

    this.like = function(videoId) {
      this.rate(videoId, "like");
    };

    this.dislike = function(videoId) {
      this.rate(videoId, "dislike");
    };

    this.unrate = function(videoId) {
      this.rate(videoId, "none");
    };

    this.rate = function(videoId, rating) {
      $http.post(
          "https://www.googleapis.com/youtube/v3/videos/rate" +
          "?id=" + videoId +
          "&rating=" + rating +
          "&access_token=" + LoginService.acessToken()
      )
      .then(function() {
        $localStorage.videos[videoId].rating = rating;
      });
    };

    this.rating = function(videoId) {
      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos/getRating" +
        "?id="            + videoId +
        "&access_token="  +LoginService.accessToken()
      );
        
    };
  }
})();
