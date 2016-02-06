angular.module( 'salesApp' )
  .directive( 'chartmenu',
    function chartmenuDrctv( $document, $window, DataFactory, $timeout ) {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: {
          obj: '=obj',
          isvisible: '=isvisible'
        },
        templateUrl: "js/directives/chart-menu/menu.tmpl.html",
        controllerAs: 'menuCtrl',

        controller: function ( $scope ) {
          this.closevisibleinner = true;

          var w_location = $window.location.href;
          var indexOfLastSlash = w_location.lastIndexOf( '/' );
          var ending = w_location.substring( indexOfLastSlash + 1 );
          if ( ending !== 'home' ) {
            this.closevisibleinner = false;
          }

          this.refresh = function () {
            DataFactory.getChartData(
              $scope.obj.formalToken,
              $scope.obj.fullscreen
            );
          };

          this.remove = function () {
            var $elem = $( '.' + $scope.obj.classToRemove );
            $elem.addClass( 'fade-out' );
            $timeout( function () {
              $elem.remove();
            }, 1000 );

          };

          this.openFullScreen = function () {
            window.open(
              $scope.obj.fullscreenLink
            );
          };

        },

        link: function ( scope, element ) {

          element.data( scope.obj.classToRemove, true );

          $document.click( function ( e ) {
            var inMenu = angular.element( e.target )
              .inheritedData( scope.obj.classToRemove );

            var inButton = angular.element( e.target )
              .hasClass( scope.obj.btnclass );

            if ( !inMenu && !inButton ) {
              scope.isvisible = false;
              scope.$apply( scope.isvisible );
            }
          } )
        }
      }
    }
  );
