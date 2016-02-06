angular.module( 'HomeCtrl', [] ).controller(
  'HomeController',
  [ '$cookies', '$window', '$rootScope', '$timeout',
    function ( $cookies, $window, $rootScope, $timeout ) {

      $rootScope.userLoggedIn = false;
      var userSession = $cookies.getObject( 'userSession' );
      if ( userSession == null ) {
        $window.location.href = '/';
      }
      else if ( !userSession.hasOwnProperty( 'sessionId' ) || !userSession.hasOwnProperty( 'username' ) ) {
        $window.location.href = '/';
      } else {

        // Radialize the colors for hightcharts
        Highcharts.getOptions().colors = Highcharts.map( Highcharts.getOptions().colors, function ( color ) {
          return {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
            },
            stops: [
              [0, color],
              [1, Highcharts.Color( color ).brighten( -0.3 ).get( 'rgb' )] // darken
            ]
          };
        } );

        $rootScope.userLoggedIn = true;

        $timeout( function () {
          $( '.home-wrapper.fadded' ).removeClass( 'fadded' );
        }, 300 );

      }

    }
  ]
);
