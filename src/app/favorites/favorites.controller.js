(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('VideoController', VideoController);

  /** @ngInject */
  function VideoController(
      $scope,
      $stateParams,
      VideoService, 
      SearchService,
      LikeService,
      $sce
  ){
    var videoCtrl = this;

    videoCtrl.query   = $stateParams.searchQuery;
    videoCtrl.videoId = $stateParams.videoId;
    videoCtrl.player  = "";

    //init
    VideoService.video(videoCtrl.videoId)
    .then(function(video) {
      videoCtrl.video   = video;
      videoCtrl.player  = $sce.trustAsHtml(video.player.embedHtml);
    });

    videoCtrl.toggleLike = function() {
      if (videoCtrl.video.rating === 'like') {
        LikeService.unrate(videoCtrl.videoId);
      }
      else {
        LikeService.like(videoCtrl.videoId);
      }
    };

    videoCtrl.toggleDislike = function() {
      if (videoCtrl.video.rating === 'dislike') {
        LikeService.unrate(videoCtrl.videoId);
      }
      else {
        LikeService.dislike(videoCtrl.videoId);
      }
    };
  }
})();
