(function() {
  'use strict';

  angular
    .module('yootoober')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
