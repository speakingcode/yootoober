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
        VideoService.unrate(videoCtrl.videoId);
      }
      else {
        VideoService.like(videoCtrl.videoId);
      }
    };

    videoCtrl.toggleDislike = function() {
      if (videoCtrl.video.rating === 'dislike') {
        VideoService.unrate(videoCtrl.videoId);
      }
      else {
        VideoService.dislike(videoCtrl.videoId);
      }
    };


    $scope.$watch(
      function() {
        return videoCtrl.query;
      },
      function(newQuery) {
        VideoService.video(newQuery);
      }
    );
  }
})();
