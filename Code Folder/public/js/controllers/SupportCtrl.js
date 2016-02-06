angular.module( 'SupportCtrl', [] ).controller(
  'SupportController',
  [ '$timeout',
    function ( $timeout ) {

      this.submitted = false;

      //close button handler
      this.close = function () {
        window.close();
      };

      //submit form handler
      this.submit = function ( $event ) {
        var closeTime = 2000; //ms

        $event.preventDefault();
        this.submitted = true;

        $timeout( function () {
          window.close();
        }, closeTime );
      };

    }
  ]
);
