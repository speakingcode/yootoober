(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('VideoService', VideoService);

  /** @ngInject */
  function VideoService($http, LoginService) {
    var _videos = {};

    this.fetch = function(videoId) {
      var that = this;

      //ignore empty and already retrieved queries
      if (!videoId)
        return;
      
      if (that.videos()[videoId])
        return;

      $http.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet,player" + 
        "&id="            + videoId +
        "&access_token="  + LoginService.accessToken()
      )
      .success(function(response) {
        _videos[videoId] = response.items;
      });
    };

    this.video = function(videoId) {
      return _videos[videoId];
    };
  }
})();
