angular.module( 'salesApp' )
  .directive( 'sitefooter',
    function sitefooterDrctv() {
      'use strict';

      return {
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: "js/directives/footer/footer.tmpl.html",
        controllerAs: 'footerCtrl',

        controller: function () {

          /**
           * Opens a popup window
           * e.g. for privacy page or terms of use
           * @param url
           */
          function openPopupWindow( url ) {
            window.open(
              url,
              "",
              "width=300, height=450, location=no, menubar=no, " +
              "status=no, toolbar=no, top=200, left=150, " +
              "location=no, titlebar=no, directories=no"
            );
          }

          //handlers for links in the footer
          this.privacy = function () {
            //Privacy Policy
            openPopupWindow( '/privacy' );
          };

          this.terms = function () {
            //Terms of Use
            openPopupWindow( '/terms-of-use' );
          };

          this.support = function () {
            //Support
            openPopupWindow( '/support' );
          };

        },

        link: function ( scope, element, attrs, ctrl ) {

        }
      }
    }
  );
