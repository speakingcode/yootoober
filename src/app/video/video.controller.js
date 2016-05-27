(function() {
  'use strict';

  angular
    .module('yootoober')
    .controller('VideoController', VideoController);

  /** @ngInject */
  function VideoController($scope, $stateParams, VideoService, SearchService) {
    var videoCtrl = this;

    videoCtrl.query = "";
    videoCtrl.videos = VideoService.videos();

    $scope.$watch(
      function() {
        return videoCtrl.query;
      },
      function(newQuery) {
        VideoService.video(newQuery);
      }
    );

    $scope.$watch(
      function(){ return VideoService.videos(); },
      function(newValue) {
        videoCtrl.videos = newValue;
      }
    );
  }
})();
