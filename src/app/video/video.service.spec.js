(function() {
  'use strict';
  describe('VideoService', function() { 
    var mockLocalStorage,
        mockLikeService,
        mockAPIKey;

    beforeEach(fucntion() {
      module('yootoober', function($provide) {
        $provide.service('LikeService', function() {
          this.rating(videoId) {
            return "like";
          }

        });
        $provide.value('$localStorage', {});
        $provide.value('GOOGLE_API_KEY', "123");
      });
    });

    beforeEach(inject(function($http, $httpBackend, $q, _LikeService_, _GOOGLE_API_KEY_, _$localStorage_) {
      mockLikeService = _LikeService_;
      mockAPIKey = _GOOGLE_API_KEY_;
      mockLocalStorage = _$localStorage_;
    })); 
  });
})();
