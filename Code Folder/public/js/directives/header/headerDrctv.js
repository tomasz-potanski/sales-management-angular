angular.module( 'salesApp' )
  .directive( 'siteheader',
    function siteheaderDrctv() {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: "js/directives/header/header.tmpl.html",
        controllerAs: 'headerDrCtrl',

        controller: function ( $http, $cookies, $window ) {

          var userSession = $cookies.getObject( 'userSession' );

          this.username = userSession.username;
          var sessionId = userSession.sessionId;

          this.logout = function ( $event ) {
            $event.preventDefault();

            var url = '/logout?sessionid=' + sessionId;

            //back-end response is not in
            //json format
            var req = {
              method: 'POST',
              url: url,
              transformResponse: [function ( data ) {
                return data;
              }]
            };

            $http( req ).
            success( function ( data ) {
              if ( data ) {
                redirect();
              }
            } ).
            error( function () {
              // TODO - log error
              redirect();
            } );

          };

          function redirect() {
            $cookies.remove( 'userSession' );
            $window.location.href = '/';
          }
        },

        link: function ( scope, element, attrs, ctrl ) {

        }
      }
    }
  );
