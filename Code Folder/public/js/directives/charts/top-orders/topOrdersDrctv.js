angular.module( 'salesApp' )
  .directive( 'toporders',
    function topordersDrctv() {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: "js/directives/charts/top-orders/topOrders.tmpl.html",
        controllerAs: 'chartCtrl',

        controller: function ( $http, DataFactory, $window ) {

          this.menuData = {
            fullscreenLink: '/top-orders',
            formalToken: 'topsalesorders',
            classToRemove: 'toporders',
            btnclass: 'top-orders-btn',
            fullscreen: false
          };
          this.isMenuVisible = false;

          var w_location = $window.location.href;
          var indexOfLastSlash = w_location.lastIndexOf( '/' );
          var ending = w_location.substring( indexOfLastSlash + 1 );
          if ( ending === 'top-orders' ) {
            this.menuData.fullscreen = true;
          }
          DataFactory.getChartData(
            'topsalesorders',
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
