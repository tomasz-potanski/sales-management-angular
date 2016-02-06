angular.module( 'salesApp' )
  .directive( 'bartotalmonth',
    function bartotalmonthDrctv() {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: "js/directives/charts/bar-total-month/bar.tmpl.html",
        controllerAs: 'chartCtrl',

        controller: function ( $http, DataFactory, $window ) {

          this.menuData = {
            fullscreenLink: '/bar-total-month',
            formalToken: 'lastyeardata',
            classToRemove: 'bartotalmonth',
            btnclass: 'bar-btn',
            fullscreen: false
          };
          this.isMenuVisible = false;

          var w_location = $window.location.href;
          var indexOfLastSlash = w_location.lastIndexOf( '/' );
          var ending = w_location.substring( indexOfLastSlash + 1 );
          if ( ending === 'bar-total-month' ) {
            this.menuData.fullscreen = true;
          }
          DataFactory.getChartData(
            'lastyeardata',
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
