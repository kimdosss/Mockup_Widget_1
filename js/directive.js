var appDirtive = angular.module('appDirtive', ['appCon']);

//Display upper chart and data
appDirtive.directive('chartDirectiveA', function(){
return {
    templateUrl: 'js/directives/upper_chart.html',
    //Restric the directive to be element
    restrict: 'E',
    //Isolate the scope of the directive in the case of reuse
    scope: {
            Options: '=options',
            Data: '=chartData',
    },
    link: function(scope, element, attributes) {  
      //Funtion for creating chart   
      createChart = function() {

        var chartContext = document.getElementById("upperChart").getContext("2d");
        createdChart = new Chart(chartContext,{overlayBars: false}).Overlay(scope.Data, scope.Options);
          
        return createdChart;
      }
      
      //Draw chart by running createChart() if chart data is loaded i.e. scope.Data changed
      scope.$watch(
        function() {return scope.Data}, 
        function(newStatus, oldStatus){
          if ( newStatus !== oldStatus ) {
             scope.currentChart = createChart();
             //Show instruction
             scope.ShowData = false;
          } 
      })

      
      element.on('mousedown', function(event) {
        // Prevent default behavior of content
        event.preventDefault();

        //Show data
        scope.ShowData = true;

        //Select data by clicking the diagram
        var points = createdChart.getPointsAtEvent(event);
        
        //The index of selected data
        scope.chartSelectedIndex = points[0].label;
        selectedIndex = points[0].label;

        //Data in upper chart area
        scope.chartCalculationData = scope.Data.datasets[0].data[selectedIndex];

        //Calculte the difference between line chart and bar chart
        scope.chartCalculationDiff = (scope.Data.datasets[0].data[selectedIndex] - scope.Data.datasets[1].data[selectedIndex]).toFixed(2);

        //Show positive sign
        if(scope.chartCalculationDiff > 0){
          scope.chartCalculationDiff = "+" + scope.chartCalculationDiff;
        }

        //Calculte the difference between line chart and bar chart in percentage
        scope.chartCalculationPercent = '(' + ((scope.chartCalculationDiff / scope.chartCalculationData)*100).toFixed(2) + '%)';

        //Update upper section
        scope.$digest();    

      });            
      
    }
  }
})

//Display current time
appDirtive.directive('clockKit', function(){
  return {
    template: '<div class="middle_section-clockKit"><span class="middle_section-clockKit-content font-clockKit">Today {{displayTime| date : "h:mm a"}}</pspan</div>',
    restrict: 'E',
    link: function(scope, element, attributes) {
      scope.displayTime = new Date();;
    }
  }
})

//Display buttom chart and data
appDirtive.directive('chartDirectiveB', function(){
return {
    templateUrl: 'js/directives/buttom_chart.html',
    //Restric the directive to be element
    restrict: 'E',
    //Isolate the scope of the directive in the case of reuse
    scope: {
            Options: '=options',
            Data: '=chartData',
    },
    link: function(scope, element, attributes) {  
      //Funtion for creating chart  
      createChartB = function() {
        var chartContext = document.getElementById("buttomChart").getContext("2d");
        createdChartB = new Chart(chartContext).Bar(scope.Data, scope.Options);          
        return createdChartB;
      }
      
      //Draw chart by running createChart() if chart data is loaded i.e. scope.Data changed
      scope.$watch(
        function() {return scope.Data}, 
        function(newStatus, oldStatus){
          if ( newStatus !== oldStatus ) {
            scope.currentChartB = createChartB();

            //Change the color of the bar and calcalte yearly change
            var YesrlyChange = 0;
            var dataLength = scope.currentChartB.datasets[0].bars.length;
            for (var i = 0; i < dataLength; i++) {
              if( i < 4 ){
                //Fill bar 0~3 with #e55f3b
                scope.currentChartB.datasets[0].bars[i].fillColor = "#e55f3b";
              } else{
                //Fill bar 4~ with #4daf7b
                scope.currentChartB.datasets[0].bars[i].fillColor = "#4daf7b";
              }

              //Sum all the data to calcalte the yearly change
              YesrlyChange += scope.currentChartB.datasets[0].bars[i].value;
              
            }

            //Update the chart
            scope.currentChartB.update(); 

            scope.YesrlyChange = '+' + YesrlyChange;  
          }
      })
     
     
      
    }
  }
})


