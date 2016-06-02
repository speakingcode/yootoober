(function() {
  'use strict';

  angular
    .module('yootoober')
    .directive('onEnter', onEnter);

  /** @ngInject */
  function onEnter() {
    var directive = {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind("keypress", function(event) {
          var keyCode = event.which || event.keyCode;

          //enter key
          if (keyCode === 13) {
            $scope.$apply(function() {
              $scope.$eval($attrs.onEnter, {$event: event});
            });

          }
        });
      }
    };

    return directive;
  }
})();
