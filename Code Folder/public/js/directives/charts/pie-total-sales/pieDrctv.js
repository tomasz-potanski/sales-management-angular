angular.module( 'salesApp' )
  .directive( 'pietotalsales',
    function pietotalsalesDrctv( $document, $window ) {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: "js/directives/charts/pie-total-sales/pie.tmpl.html",
        controllerAs: 'chartCtrl',

        controller: function ( $scope, $http, DataFactory, $window ) {

          this.menuData = {
            fullscreenLink: '/pie-total-sales',
            formalToken: 'salesmandata',
            classToRemove: 'pietotalsales',
            btnclass: 'pie-btn',
            fullscreen: false
          };
          this.isMenuVisible = false;

          var w_location = $window.location.href;
          var indexOfLastSlash = w_location.lastIndexOf( '/' );
          var ending = w_location.substring( indexOfLastSlash + 1 );
          if ( ending === 'pie-total-sales' ) {
            this.menuData.fullscreen = true;
          }
          DataFactory.getChartData(
            'salesmandata',
            this.menuData.fullscreen
          );

          this.toggleMenu = function ( $event ) {
            this.isMenuVisible = !this.isMenuVisible;
            $event.stopPropagation();
          };

        },

        link: function ( scope, element, attrs, ctrl ) {
        }
      }
    }
  );
