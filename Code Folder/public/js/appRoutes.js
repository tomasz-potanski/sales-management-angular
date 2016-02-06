angular.module( 'appRoutes', [] ).config(
  ['$routeProvider', '$locationProvider',
    function ( $routeProvider, $locationProvider ) {

      $routeProvider

      //login screan
        .when( '/', {
          templateUrl: 'views/login.html',
          controller: 'MainController',
          controllerAs: 'mainCtrl'
        } )
        .when( '/privacy', {
          templateUrl: 'views/privacy.html',
          controller: 'PrivacyController',
          controllerAs: 'privacyCtrl'
        } )
        .when( '/terms-of-use', {
          templateUrl: 'views/terms-of-use.html',
          controller: 'TermsController',
          controllerAs: 'termsCtrl'
        } )
        .when( '/support', {
          templateUrl: 'views/support.html',
          controller: 'SupportController',
          controllerAs: 'supportCtrl'
        } )
        .when( '/home', {
          templateUrl: 'views/home.html',
          controller: 'HomeController',
          controllerAs: 'homeCtrl'
        } )

        //fullscreen view for charts
        .when( '/bar-total-month', {
          templateUrl: 'views/chart-view/bar-total-month.html',
          controller: 'FullPageChartController',
          controllerAs: 'ctrl'
        } )
        .when( '/pie-total-sales', {
          templateUrl: 'views/chart-view/pie-total-sales.html',
          controller: 'FullPageChartController',
          controllerAs: 'ctrl'
        } )
        .when( '/top-orders', {
          templateUrl: 'views/chart-view/top-orders.html',
          controller: 'FullPageChartController',
          controllerAs: 'ctrl'
        } )
        .when( '/top-salesmen', {
          templateUrl: 'views/chart-view/top-salesmen.html',
          controller: 'FullPageChartController',
          controllerAs: 'ctrl'
        } );

      $locationProvider.html5Mode( true );

    }] );
