(function() {
  'use strict';

  angular
    .module('yootoober')
    .service('LoginService', LoginService);

  /** @ngInject */
  function LoginService($window) {
    var _accessToken,
        clientId      = "329328501290-l20p5arvgfeq02ado3b4n9bo9kso0lph.apps.googleusercontent.com",
        scope         = encodeURIComponent("https://www.googleapis.com/auth/youtube"),
        redirectUri   = "http://localhost:3000/auth", //window.location,
        responseType  = "token",
        url           = "https://accounts.google.com/o/oauth2/auth?" + 
                        "client_id="      + clientId +
                        "&redirect_uri="  + encodeURIComponent(redirectUri) + 
                        "&scope="         + scope +
                        "&response_type=" + responseType;

    this.login = function() {
      $window.location.replace(url);
    };

    this.accessToken = function(accessToken) {
      if (arguments.length === 0)
        return _accessToken;

      _accessToken = accessToken;
    };

    this.isLoggedIn = function() {
      return !!_accessToken;
    };

  }
})();
