angular.module('salesApp',
  [
    'Dependencies',
    'Controllers'
  ]);

angular.module( 'Dependencies',
  [
    'ngRoute', 'appRoutes', 'ngCookies', 'gridster', 'highcharts-ng',
    'ngAnimate'
  ]);

angular.module( 'Controllers',
  [
    'MainCtrl', 'SupportCtrl', 'PrivacyCtrl', 'TermsCtrl',
    'HomeCtrl', 'FullPageChartCtrl'
  ]);
