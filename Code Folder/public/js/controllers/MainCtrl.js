angular.module( 'MainCtrl', [] ).controller(
  'MainController',
  ['$scope', '$http', '$window', '$cookies', '$timeout',
    function ( $scope, $http, $window, $cookies, $timeout ) {

      //submit login-form handler
      this.submit = function ( $event ) {
        $event.preventDefault();

        var url = 'http://localhost:8080/login?username=' +
          $scope.name + '&password=' + $scope.pass;

        $http.post( url ).
        success( function ( data ) {
          if ( data ) {
            if ( data.loginSucceeded === true ) {
              var currentUser = {
                username: $scope.name,
                sessionId: data.sessionId
              };
              $cookies.putObject( 'userSession', currentUser );

              $( '.black-plane' ).addClass( 'revealed' );
              $( '.white-plane' ).addClass( 'revealed' );
              $timeout( function () {
                $window.location.href = '/home';
              }, 900 );
            }
          }
        } ).
        error( function ( data, status, headers, config ) {
          // TODO - log error
        } );

      };

    }
  ]
);
