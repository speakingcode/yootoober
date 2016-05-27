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

    VideoService.video(videoCtrl.videoId)
    .then(function(video) {
      videoCtrl.video   = video;
      videoCtrl.player  = $sce.trustAsHtml(video.player.embedHtml);
      //  document.getElementById('playa').innerHTML = video.player.embedHtml;
    });

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
