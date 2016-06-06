(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('LikeService', LikeService);

  /** @ngInject */
  function LikeService($http, $localStorage, $q, LoginService) {

    var likes = [],
        that  = this;
    
    this.likes = function() {
      if (likes.length !== 0)
        return $q.when(likes);

      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&myRating="      + "like" +
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        likes = response.data.items.map(function(video) {
          return video.id.videoId;
        });
        return likes;
      });
    };

    this.like = function(videoId) {
      likes.push(videoId);
      that.rate(videoId, "like");
    };

    this.dislike = function(videoId) {
      likes.splice(likes.indexOf(videoId), 1);
      that.rate(videoId, "dislike");
    };

    this.unrate = function(videoId) {
      likes.splice(likes.indexOf(videoId), 1);
      that.rate(videoId, "none");
    };

    this.rate = function(videoId, rating) {
      $http.post(
          "https://www.googleapis.com/youtube/v3/videos/rate" +
          "?id=" + videoId +
          "&rating=" + rating +
          "&access_token=" + LoginService.accessToken()
      )
      .then(function() {
        $localStorage.videos[videoId].rating = rating;
      });
    };

    this.rating = function(videoId) {
      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos/getRating" +
        "?id="            + videoId +
        "&access_token="  + LoginService.accessToken()
      );
    };
  }
})();
