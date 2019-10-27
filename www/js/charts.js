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
  let chartVar1 = newLineChart("Age vs. Activity", data.age, data.activity, "Age of Dogs in Months", "Activity Level on a Scale of 1-5", chart1);
  let chartVar2 = newPieChart("% of Dogs at risk for obesity", data.obesity, "Obesity Risk", "No Obesity risk", chart2);
  let chartVar3 = newLineChart("Weight vs. Ideal Weight", data.weight, data.idealWeight, "Weight in Kg", "Ideal Weight in Kg", chart3);
  let chartVar4 =  newLineChart("Weight vs. Age", data.weight, data.age, "Weight in Kg", "Age in Months", chart4)
})  

function newLineChart(title, dataArrayX, dataArrayY, labelX, labelY, canvasElement) {

  let bottomLabels = [];

  let x = 0;
  let len = dataArrayY.length
  while(x < len){ 
    bottomLabels.push(Math.floor(dataArrayY[x])); 
    x++
  }

  bottomLabels.sort(function(a, b){return a-b});

  return new Chart(canvasElement, {
    type: "line",
    data: {
      labels: bottomLabels,
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

function newPieChart(title, dataArray, labelX, labelY, canvasElement) {

  let trueCounter = 0;

  for (i = 0; i < dataArray.length; i++) {
    if(dataArray[i] == true) {
      trueCounter++;
    }
  }

  let falseCounter = dataArray.length - trueCounter;

  return new Chart(canvasElement, {
    type: "doughnut",
    data: {
      datasets: [
      {
        data: [trueCounter, falseCounter],
        borderWidth: 1
      }
      ],
      labels: ["Obesity Risk", "No Obesity Risk"],
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
