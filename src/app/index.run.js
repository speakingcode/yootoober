(function() {
  'use strict';

  angular
    .module('youtuber')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
