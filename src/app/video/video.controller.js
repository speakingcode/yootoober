(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('VideoController', VideoController);

  /** @ngInject */
  function VideoController($scope, $stateParams, VideoService, SearchService) {
    var videoCtrl = this;

    videoCtrl.query   = $stateParams.searchQuery;
    videoCtrl.videoId = $stateParams.videoId;

    VideoService.video(videoCtrl.videoId)
    .then(function(video) {
      document.getElementById('playa').innerHTML = video.player.embedHtml;
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
