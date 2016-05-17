var appCon = angular.module('appCon', []);

appCon.controller('widgetCon', ['$scope', '$http', function($scope,$http){

    //Set up the charts
    $scope.ChartOptions = {
        
                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines: false,

                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: false,

                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines: true,

                    //Boolean - Whether the line is curved between points
                    bezierCurve: false,

                    //Boolean - Whether to show a dot for each point
                    pointDot: false,

                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius: 10,

                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke: true,

                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth: 3,

                    //Boolean - Whether to fill the dataset with a colour
                    datasetFill: false, 

                    ///Boolean - Whether axis are shown
                    showScale: false,

                    //Boolean - If there is a stroke on each bar
                    barShowStroke: false,

                    //Number - Spacing between data sets within X values
                    barValueSpacing: 3,

                    // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
                    showTooltips: false,

                    // String - Template string for single tooltips
                    tooltipTemplate: "<%if (label){%><%=label%>- <%}%><%= value %>",

    };

    //Read data from json file
    $scope.loalData = function(){

        $http.get('data/razorfish_upper_data.json').
        success(function(data) {
            $scope.UpperChartData = data;            
        });

        $http.get('data/razorfish_buttom_data.json').
        success(function(data) {
            $scope.ButtomChartData = data;            
        })
  
    };

    $scope.loalData();

}]);

