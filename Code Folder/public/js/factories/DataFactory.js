angular.module( 'salesApp' )
  .factory( 'DataFactory',
    ['$q', '$http', '$cookies', '$rootScope', '$timeout', '$window',
      function DataFactory( $q, $http, $cookies, $rootScope,
                            $timeout, $window ) {
        'use strict';

        var exports = {};

        function getData( requestType, fullscreen ) {
          var deferred = $q.defer();
          var userSession = $cookies.getObject( 'userSession' );
          var sessionId = userSession.sessionId;
          $rootScope.username = userSession.username;

          var width = null;
          var height = null;
          if ( fullscreen ) {
            width = $window.innerWidth - 30;
            height = $window.innerHeight - 30;
          }

          var url = 'http://localhost:8080/' +
            requestType + '?sessionid=' + sessionId;

          return $http.get( url )
            .success( function ( data ) {
              $rootScope[requestType] = data;

              exports.buildChart( requestType, width, height );
              deferred.resolve( data );
            } )
            .error( function ( data ) {
              deferred.reject( data );
            } );
        }

        exports.getChartData = function ( requestType, fullscreen ) {
          if ( $rootScope.userLoggedIn ) {
            getData( requestType, fullscreen )
              .then( function () {},
                function () {
                  //TODO - log failure
                  handleFailure( requestType, fullscreen );
                } );
          } else {
            handleFailure( requestType, fullscreen );
          }
        };

        function handleFailure( requestType, fullscreen ) {
          var failureCounter = 0;
          $timeout( function ( type ) {
            ++failureCounter;
            if ( failureCounter < 4 ) {
              getData( type, fullscreen );
            }
          }.bind( null, requestType ), 1200 );
        }

        exports.buildChart = function ( type, width, height ) {
          var func = null;
          if ( type === 'salesmandata' ) {
            func = buildPieChart

          } else if ( type === 'lastyeardata' ) {
            func = buildBarChart;

          } else if ( type === 'topsalesorders' ) {
            func = buildTopSalesOrderChart;

          } else if ( type === 'topsalesmen' ) {
            func = buildTopSalesmenChart;
          }

          if ( func ) {
            func( width, height );
          }

        };

        function buildTopSalesOrderChart( width, height ) {
          var dom_width = parseInt( $( '.gridster-item.toporders' )
              .css( 'width' ) ) - 20;

          var dom_height = parseInt( $( '.gridster-item.toporders' )
              .css( 'height' ) ) - 20;

          var d_width = width || dom_width;
          var d_height = height || dom_height;

          var reformattedData = [];
          for ( var i = 0; i < $rootScope.topsalesorders.data.length; i++ ) {
            var current = $rootScope.topsalesorders.data[i];
            var item = {
              "name": current.userName,
              "y": current.value * current.qty,
              "value": current.value,
              "qty": current.qty,
              "orderNum": current.orderNum
            };

            reformattedData.push( item );
          }

          $rootScope.barTopSalesOrderConfig = {

            options: {
              chart: {
                backgroundColor: '#667B8B',
                type: 'column'
              },
              credits: {
                enabled: false
              },
              xAxis: {
                type: 'category',
                labels: {
                  rotation: -80,
                  style: {
                    fontSize: '13.5px',
                    fontFamily: 'Verdana, sans-serif',
                    color: 'white'
                  }
                }
              },
              yAxis: {
                min: 0,
                style: {
                  color: 'white'
                },
                labels: {
                  style: {
                    color: 'white'
                  }
                },
                title: {
                  text: 'Order\'s total value',
                  style: {
                    fontSize: '14px',
                    color: 'white'
                  }
                }
              },
              legend: {
                enabled: false
              },
              tooltip: {
                formatter: function () {
                  return 'Sale id: ' + this.point.orderNum + '. ' + this.point.name + ': <b>' + this.point.value + ' x ' + this.point.qty + ' = ' + (this.point.y / 1000).toFixed( 2 ) + ' thousands.</b>';
                },
                style: {
                  padding: 10,
                  fontWeight: 'bold'
                }
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                  }
                }
              }
            },

            series: [{
              name: "Total sales",
              colorByPoint: true,
              data: reformattedData
            }],
            title: {
              text: 'Top 5 sales orders in amount',
              style: {
                fontSize: '16px',
                fontWeight: '700',
                textAlign: 'center',
                color: 'white'
              }
            },
            loading: false,
            xAxis: {
              currentMin: 0,
              currentMax: 4,
              title: {
                text: 'Months',
                style: {
                  fontSize: '16px',
                  color: 'white'
                }
              }
            },
            useHighStocks: false,
            size: {
              width: d_width,
              height: d_height
            },
            func: function ( chart ) {
              //TODO - setup some logic for the chart
            }
          };
        }

        function buildTopSalesmenChart( width, height ) {
          var dom_width = parseInt( $( '.gridster-item.topsalesmen' )
              .css( 'width' ) ) - 20;

          var dom_height = parseInt( $( '.gridster-item.topsalesmen' )
              .css( 'height' ) ) - 20;

          var d_width = width || dom_width;
          var d_height = height || dom_height;

          var reformattedData = [];
          for ( var i = 0; i < $rootScope.topsalesmen.data.length; i++ ) {
            var current = $rootScope.topsalesmen.data[i];
            var item = [
              current[0],
              parseInt( current[1] )
            ];

            reformattedData.push( item );
          }

          $rootScope.barTopSalesmenConfig = {

            options: {
              chart: {
                backgroundColor: '#003797',
                type: 'column'
              },
              credits: {
                enabled: false
              },
              xAxis: {
                type: 'category',
                labels: {
                  rotation: -80,
                  style: {
                    fontSize: '13.5px',
                    fontFamily: 'Verdana, sans-serif',
                    color: 'white'
                  }
                }
              },
              yAxis: {
                min: 0,
                labels: {
                  style: {
                    color: 'white'
                  }
                },
                title: {
                  text: 'Revenue from last 3m',
                  style: {
                    fontSize: '14px',
                    color: 'white'
                  }
                }
              },
              legend: {
                enabled: false
              },
              tooltip: {
                formatter: function () {
                  return 'Saled by ' + this.point.name + ': <b>' + (this.point.y / 1000).toFixed( 2 ) + ' thousands.</b>';
                },
                style: {
                  padding: 10,
                  fontWeight: 'bold'
                }
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                  }
                }
              }
            },

            series: [{
              name: "Revenue from last 3 months",
              colorByPoint: true,
              data: reformattedData
            }],
            title: {
              text: 'Top 5 sales men in last 3 months',
              style: {
                fontSize: '16px',
                fontWeight: 700,
                textAlign: 'center',
                color: 'white'
              }
            },
            loading: false,
            xAxis: {
              currentMin: 0,
              currentMax: 4,
              title: {
                text: 'Top salesmen',
                style: {
                  fontSize: '16px',
                  color: 'white'
                }
              }
            },
            useHighStocks: false,
            size: {
              width: d_width,
              height: d_height
            },
            func: function ( chart ) {
              //TODO - setup some logic for the chart
            }
          };
        }

        function buildBarChart( width, height ) {
          var dom_width = parseInt( $( '#lastyeardata' )
              .parent().parent().parent().css( 'width' ) ) - 20;

          var dom_height = parseInt( $( '#lastyeardata' )
              .parent().parent().parent().css( 'height' ) ) - 20;

          var d_width = width || dom_width;
          var d_height = height || dom_height;

          var reformattedData = [];
          for ( var i = 0; i < $rootScope.lastyeardata.data.length; i++ ) {
            var current = $rootScope.lastyeardata.data[i];
            var item = [
              current[0],
              parseInt( current[1] )
            ];

            reformattedData.push( item );
          }

          $rootScope.barChartConfig = {

            options: {
              chart: {
                backgroundColor: '#FFE4A5',
                type: 'column'
              },
              credits: {
                enabled: false
              },
              xAxis: {
                type: 'category',
                labels: {
                  rotation: -80,
                  style: {
                    fontSize: '13.5px',
                    fontFamily: 'Verdana, sans-serif',
                    color: 'black'
                  }
                }
              },
              yAxis: {
                min: 0,
                labels: {
                  style: {
                    color: 'black'
                  }
                },
                title: {
                  text: 'Total sales',
                  style: {
                    fontSize: '14px',
                    color: 'black'
                  }
                }
              },
              legend: {
                enabled: false
              },
              tooltip: {
                formatter: function () {
                  return 'Sales in ' + this.point.name + ': <b>' + Math.floor( this.point.y / 1000 ) + ' thousands.</b>';
                },
                style: {
                  padding: 10,
                  fontWeight: 'bold'
                }
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                  }
                }
              }
            },

            series: [{
              name: "Total sales",
              colorByPoint: true,
              data: reformattedData
            }],
            title: {
              text: 'Total sales per month',
              style: {
                fontSize: '16px',
                fontWeight: '700',
                textAlign: 'center'
              }
            },
            loading: false,
            xAxis: {
              currentMin: 0,
              currentMax: 11,
              title: {
                text: 'Months',
                style: {
                  fontSize: '16px',
                  color: 'black'
                }
              }
            },
            useHighStocks: false,
            size: {
              width: d_width,
              height: d_height
            },
            func: function ( chart ) {
              //TODO - setup some logic for the chart
            }
          };
        }

        function buildPieChart( width, height ) {
          var dom_width = parseInt( $( '#salesmandata' )
              .parent().parent().parent().css( 'width' ) ) - 20;

          var dom_height = parseInt( $( '#salesmandata' )
              .parent().parent().parent().css( 'height' ) ) - 30;

          var d_width = width || dom_width;
          var d_height = height || dom_height;

          var reformattedData = [];
          for ( var i = 0; i < $rootScope.salesmandata.data.length; i++ ) {
            var current = $rootScope.salesmandata.data[i];
            var obj = {
              "name": current[0],
              "y": parseInt( current[1] )
            };
            if ( $rootScope.username == current[0] ) {
              obj.sliced = true;
              obj.selected = true;
            }
            reformattedData.push( obj );
          }

          $rootScope.chartConfig = {

            options: {
              chart: {
                backgroundColor: '#00C47D',
                type: 'pie'
              },
              credits: {
                enabled: false
              },
              tooltip: {
                style: {
                  padding: 10,
                  fontWeight: 'bold'
                }
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                  }
                }
              }
            },

            series: [{
              name: "Total sales",
              colorByPoint: true,
              data: reformattedData
            }],
            title: {
              text: 'Total sales values for each salesman',
              style: {
                fontSize: '16px',
                fontWeight: '700',
                textAlign: 'center'
              }
            },
            loading: false,
            xAxis: {
              currentMin: 0,
              currentMax: 20,
              title: { text: 'values' }
            },
            useHighStocks: false,
            size: {
              width: d_width,
              height: d_height
            },
            func: function ( chart ) {
              //TODO - setup some logic for the chart
            }
          };

        }

        return exports;
      }] );
