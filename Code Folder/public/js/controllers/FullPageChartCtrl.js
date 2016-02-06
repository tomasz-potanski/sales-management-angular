angular.module( 'FullPageChartCtrl', [] ).controller(
  'FullPageChartController',
  [ 'DataFactory', '$timeout',
    function ( DataFactory, $timeout ) {

      DataFactory.getChartData( 'salesmandata' );
      $timeout(function(){
        var $elem = $( '#full-page-chart-wrapper.fadded' );
        $elem.removeClass( 'fadded' );
      }, 1700);

    }
  ]
);
