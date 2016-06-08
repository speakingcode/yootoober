(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('LikeService', LikeService);

  /** @ngInject */
  function LikeService($http, $localStorage, $q, LoginService) {

    var likes = {},
        that  = this;
    
    this.likes = function() {
      if (that.likeCount() !== 0)
        return $q.when(likes);

      return $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,id" + 
        "&myRating="      + "like" +
        "&maxResults="    + "50" + 
        "&access_token="  + LoginService.accessToken()
      )
      .then(function(response) {
        response.data.items.forEach(function(video) {
          likes[video.id] = video;
        });
        return likes;
      });
    };

    this.likeCount = function() {
      return Object.keys(likes).length;
    };

    this.like = function(video) {
      likes[video.id] = video;
      that.rate(video.id, "like");
    };

    this.dislike = function(video) {
      delete likes[video.id];
      that.rate(video.id, "dislike");
    };

    this.unrate = function(video) {
      delete likes[video.id];
      that.rate(video.id, "none");
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
