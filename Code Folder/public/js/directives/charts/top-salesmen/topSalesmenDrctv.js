angular.module( 'salesApp' )
  .directive( 'topsalesmen',
    function topsalesmenDrctv() {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: "js/directives/charts/top-salesmen/topSalesmen.tmpl.html",
        controllerAs: 'chartCtrl',

        controller: function ( $http, DataFactory, $window ) {

          this.menuData = {
            fullscreenLink: '/top-salesmen',
            formalToken: 'topsalesmen',
            classToRemove: 'topsalesmen',
            btnclass: 'pie-btn',
            fullscreen: false
          };
          this.isMenuVisible = false;

          var w_location = $window.location.href;
          var indexOfLastSlash = w_location.lastIndexOf( '/' );
          var ending = w_location.substring( indexOfLastSlash + 1 );
          if ( ending === 'top-salesmen' ) {
            this.menuData.fullscreen = true;
          }
          DataFactory.getChartData(
            'topsalesmen',
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
