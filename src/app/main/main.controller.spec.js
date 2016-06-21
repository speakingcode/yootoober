(function() {
  'use strict';

  describe('MainController', function(){
    var mainCtrl,
        mockLoginService;

    beforeEach(function() {
      module('yootoober', function($provide) {
        $provide.service('LoginService', function() {
          var accessToken = false;
          this.login = function() {
            accessToken = true;
          };

          this.isLoggedIn = function() { return accessToken };
        });
      });
    });

    beforeEach(inject(function(_$controller_, _LoginService_) {
      mockLoginService = _LoginService_;
      mainCtrl = _$controller_('MainController', {
        LoginService: mockLoginService
      });
    }));
  
    it('should be able to initiate login', function() {
      mainCtrl.login();
      expect(mainCtrl.isLoggedIn()).toEqual(true);
    });

  });
})();
