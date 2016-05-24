(function() {
  'use strict';

  angular
    .module('yootoober')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    
    //no hash in links
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  }

})();
