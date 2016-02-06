angular.module( 'salesApp' ).run(
  ['gridsterConfig', 'DataFactory',
    function ( gridsterConfig, DataFactory ) {
      gridsterConfig.columns = 30;
      gridsterConfig.colWidth = 44;
      gridsterConfig.floating = true;
      gridsterConfig.rowHeight = 32;
      gridsterConfig.swapping = true;

      gridsterConfig.resizable.stop = function ( event, $element, widget ) {

        var width = parseInt( $element.css( 'width' ) ) - 20;
        var height = parseInt( $element.css( 'height' ) ) - 20;

        if ( $element.hasClass( 'pietotalsales' ) ) {
          DataFactory.buildChart( 'salesmandata', width, height );

        } else if ( $element.hasClass( 'bartotalmonth' ) ) {
          DataFactory.buildChart( 'lastyeardata', width, height );

        } else if ( $element.hasClass( 'toporders' ) ) {
          DataFactory.buildChart( 'topsalesorders', width, height );

        } else if ( $element.hasClass( 'topsalesmen' ) ) {
          DataFactory.buildChart( 'topsalesmen', width, height );
        }

      };

    }
  ]
);
