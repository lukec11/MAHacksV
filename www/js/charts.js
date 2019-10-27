var data;

//var socket = io.connect('http://127.0.0.1:3000');

var chart1 = document.getElementById("ageVSActivity");
var chart2 = document.getElementById("obesity");
var chart3 = document.getElementById("weightVSIdealWeight");
var chart4 = document.getElementById("weightVSAge");

var socket = io.connect('http://127.0.0.1:3000');

socket.emit("dataCharts");

socket.on('connect', function(data) {
  console.log("connected")
});

socket.on("dataInObject", function(dataInObject) {
  console.log(dataInObject);
  data = dataInObject;
  newLineChart("Age vs. Activity", data.age, data.activity, "Age of Dogs in Months", "Activity Level on a Scale of 1-5", chart1);
  newLineChart("Weight vs. Ideal Weight", data.weight, data.);
})  

function newLineChart(title, dataArrayX, dataArrayY, labelX, labelY, canvasElement) {

  dataArrayXY = [];

  console.log(dataArrayXY);

  for (i = 0; i < dataArrayX.length; i++) {
    dataArrayXY.push({x: dataArrayX[i], y: dataArrayY[i]})
  }
  console.log(dataArrayXY);

  var myChart = new Chart(chart1, {
    type: 'line',
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
      {
        label: labelX,
        data: dataArrayX,
        borderWidth: 1
      },  
      {
        label: labelY,
        data: dataArrayY,
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            reverse: false
          }
        }]
      }
    }
  });
}