var selectElemGeo = document.getElementById('geosel');
var selectElemCounty = document.getElementById('sel');
var selectElemMuni = document.getElementById('munisel');
var selectElemSource = document.getElementById('sel2');
var selectElemStat = document.getElementById('sel3');
var drawElement = document.getElementById('drawbtn');
var srcCanvas = document.getElementById('canvas');


$("#geosel").on('change',function(){  
  var value=$(this).val();
  if(value=="County")
  {

      $("#sel").show();
      $("#munisel").hide();//.html(options);
      $("#SDOEst").show();
      

  }
  else if(value=="Municipality")
  {
/*     var options = "";
    options+='<option value="0" >Colorado</option>'
      +'<option value="1" >Adams</option>'; */
      $("#sel").hide();
      $("#munisel").show();//html(options);
      $("#SDOEst").hide();
      //$("#sel2").html(html).trigger('change');
  }
});

/* document.getElementById("geosel").addEventListener("change",function(){

}) */

//function to create a white background for the canvas and convert to a png
function dlCanvas(){
  destinationCanvas = document.createElement("canvas");
  destinationCanvas.width = srcCanvas.width;
  destinationCanvas.height = srcCanvas.height;

  destCtx = destinationCanvas.getContext('2d');

  //create a rectangle with the desired color
  destCtx.fillStyle = "#FFFFFF";
  destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

  //draw the original canvas onto the destination canvas
  destCtx.drawImage(srcCanvas, 0, 0);
  var dt = destinationCanvas.toDataURL('image/png');
  this.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
};
downloadPNG.addEventListener('click', dlCanvas, false);

//$('select[multiple]').multiselect()

//change these to reflect Alamosa when making the annual update
var startlabels = ['0 to 4', '5 to 9', '10 to 14', '15 to 19', '20 to 24', '25 to 29', '30 to 34', '35 to 39', '40 to 44', '45 to 49', '50 to 54', '55 to 59', '60 to 64', '65 to 69', '70 to 74', '75 to 79', '80 to 84', '85 to 89', '90 to 94', '95+'];
var startcolors = ["#be66a2", "#65a620", "#7b6888", "#546e91", "#bca44a", "#5b388f", "#e98125", "#961a1a"];
var startdata = [992,1389,129,137,2078,695,756,436,0,0,992,1389,129,137,2078,695,756,436,0,0]; //Load Alamosa County manually for now

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
  var firstdata = getData("0");
  var seconddata = getData2();
  
  var sdodata = [];
  var censusdata = [];
  for (i in firstdata){
    sdodata.push(Number(firstdata[i].totalpopulation));
  }
  for (i in seconddata){
    if (seconddata[i].fips == 0){
      censusdata.push(Number(seconddata[i].Age0));
      censusdata.push(Number(seconddata[i].Age5));
      censusdata.push(Number(seconddata[i].Age10));
      censusdata.push(Number(seconddata[i].Age15));
      censusdata.push(Number(seconddata[i].Age20));
      censusdata.push(Number(seconddata[i].Age25));
      censusdata.push(Number(seconddata[i].Age30));
      censusdata.push(Number(seconddata[i].Age35));
      censusdata.push(Number(seconddata[i].Age40));
      censusdata.push(Number(seconddata[i].Age45));
      censusdata.push(Number(seconddata[i].Age50));
      censusdata.push(Number(seconddata[i].Age55));
      censusdata.push(Number(seconddata[i].Age60));
      censusdata.push(Number(seconddata[i].Age65));
      censusdata.push(Number(seconddata[i].Age70));
      censusdata.push(Number(seconddata[i].Age75));
      censusdata.push(Number(seconddata[i].Age80));
      censusdata.push(Number(seconddata[i].Age85));
      censusdata.push(Number(seconddata[i].Age90));
      censusdata.push(Number(seconddata[i].Age95));
    }
  }

	window.myLine = new Chart(ctx, {
		type: 'line',
		//data: lineChartData,
    
    data: {
      datasets:[{
        label: "Colorado",
        data: censusdata,
        fill: false,
        backgroundColor: 'rgb(239,138,98)',
        borderColor: 'rgb(239,138,98)'
      }/* ,
      {
        label: "Census",
        data: censusdata,
        fill: false,
        borderColor: 'rgb(103,169,207)'
      } */
    ],
      labels: startlabels,
    },
		options: {

      // Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide

			tooltips: {
			  callbacks: {
			    title: function(tooltipItem, data){
            display: false
          },
          label: function(tooltipItem, data) {
            if (selectElemStat.value != 1){
              var label = commafy(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
            } else {
              var label = formatAsPercentage(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],2);
            }
            return label;
  			    },
			  }
			},  
			scales: {
			  yAxes: [{
			    barPercentage: 1,
			    categoryPercentage: 0.5,
          ticks: {
			      callback: function(value, index, values) {
              if (selectElemStat.value != 1){
			          return commafy(value);
              } else{
                return formatAsPercentage(value, 0);
              }
			      }
			    },
			  }],
			  xAxes: [{
			    scaleLabel: {
			      display: true,
			      labelString: 'Age Groups'
			    }
			  }]
			},
			elements: {
				rectangle: {
					borderWidth: 1,
				}
			},
			responsive: false,
			legend: {
				display: true,
				position: 'right',
			},
			title: {
				display: true,
				text: 'Age Comparison'
			}
		}
	});
			
};

//Change select elements



//selectElemCounty.addEventListener('change', handler, false);
//selectElemSource.addEventListener('change', handler, false);
drawElement.addEventListener("click", handler);

//selectElemCountyaddEventListener('change', function() {
function handler(event){
  var chartDatasets = [];
  if (selectElemGeo.value == "County"){
    var selectedValues = $('#sel').val();
  } else {
    var selectedValues = $('#munisel').val();
  }
  
  myLine.data.datasets.forEach(dataset => { 
    for (let d = 0; d < myLine.data.datasets.length; i++){
      myLine.data.datasets.pop();
    }
    //console.log(selectElemCounty.value);
    
    //console.log(selectElemVal);
    seconddata = getData2();
    for (let i = 0; i < selectedValues.length; i++){
      //selectElemVal = getData(selectedValues[i]);
      //console.log(selectElemVal);
      var sdodata = [];
      var censusdata = [];
      
      if (selectElemStat.value == "0"){
        for (j in seconddata){
          if (seconddata[j].fips == selectedValues[i]){
            jurname = seconddata[j].name;
            censusdata.push(Number(seconddata[j].Age0));
            censusdata.push(Number(seconddata[j].Age5));
            censusdata.push(Number(seconddata[j].Age10));
            censusdata.push(Number(seconddata[j].Age15));
            censusdata.push(Number(seconddata[j].Age20));
            censusdata.push(Number(seconddata[j].Age25));
            censusdata.push(Number(seconddata[j].Age30));
            censusdata.push(Number(seconddata[j].Age35));
            censusdata.push(Number(seconddata[j].Age40));
            censusdata.push(Number(seconddata[j].Age45));
            censusdata.push(Number(seconddata[j].Age50));
            censusdata.push(Number(seconddata[j].Age55));
            censusdata.push(Number(seconddata[j].Age60));
            censusdata.push(Number(seconddata[j].Age65));
            censusdata.push(Number(seconddata[j].Age70));
            censusdata.push(Number(seconddata[j].Age75));
            censusdata.push(Number(seconddata[j].Age80));
            censusdata.push(Number(seconddata[j].Age85));
            censusdata.push(Number(seconddata[j].Age90));
            censusdata.push(Number(seconddata[j].Age95));
          }
        }   

        //const dsColor = getRandomColor();
        const newDataset = {
          label: jurname,
          backgroundColor: colorList[i],
          borderColor: colorList[i],
          fill: false,
          data: censusdata
        }
        //console.log("Push");
        myLine.data.datasets.push(newDataset)
      } else {
        
        var censustotalpop = 0;
        var tempcensus = [];
        for (j in seconddata){
          if (seconddata[j].fips == selectedValues[i]){
            jurname = seconddata[j].name;
            tempcensus.push(Number(seconddata[j].Age0));
            tempcensus.push(Number(seconddata[j].Age5));
            tempcensus.push(Number(seconddata[j].Age10));
            tempcensus.push(Number(seconddata[j].Age15));
            tempcensus.push(Number(seconddata[j].Age20));
            tempcensus.push(Number(seconddata[j].Age25));
            tempcensus.push(Number(seconddata[j].Age30));
            tempcensus.push(Number(seconddata[j].Age35));
            tempcensus.push(Number(seconddata[j].Age40));
            tempcensus.push(Number(seconddata[j].Age45));
            tempcensus.push(Number(seconddata[j].Age50));
            tempcensus.push(Number(seconddata[j].Age55));
            tempcensus.push(Number(seconddata[j].Age60));
            tempcensus.push(Number(seconddata[j].Age65));
            tempcensus.push(Number(seconddata[j].Age70));
            tempcensus.push(Number(seconddata[j].Age75));
            tempcensus.push(Number(seconddata[j].Age80));
            tempcensus.push(Number(seconddata[j].Age85));
            tempcensus.push(Number(seconddata[j].Age90));
            tempcensus.push(Number(seconddata[j].Age95));
          }   
        }
        for (j in tempcensus){
          censustotalpop += tempcensus[j];
        }
        for (j in tempcensus){
          console.log(censustotalpop);
          censusdata.push((tempcensus[j]/censustotalpop*100));
        }

        //const dsColor = getRandomColor();
        const newDataset = {
          label: jurname,
          backgroundColor: colorList[i],
          borderColor: colorList[i],
          fill: false,
          data: censusdata
        }

        myLine.data.datasets.push(newDataset)
      }
    }
});
    
  window.myLine.update();
};


function getData(fips) {
  /* var url = "https://gis.dola.colorado.gov/lookups/sya?county="+fips+"&year=2020&choice=5yr";
  if (fips = "0"){
    console.log("True");
    url = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=2020&choice=5yr";
  } */ 
  var data = $.ajax({
   url: "https://gis.dola.colorado.gov/lookups/sya?county="+fips+"&year=2020&choice=5yr",
   dataType: 'json',
   async: false,

   });
   
  return data.responseJSON;
 
}

function getData2(){
  var data = $.ajax({
    url: "data/dhcage.json",
    dataType: 'json',
    async: false,
 
    });
    return data.responseJSON;
    //console.log("2nd " + data.responseJSON[1].county);
}


function commafy(nStr) {
    var x, x1, x2, rgx;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function alphanum(a, b) {
  function chunkify(t) {
    var tz = [], x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a);
  var bb = chunkify(b);

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return c - d;
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
  return aa.length - bb.length;
}

function formatAsPercentage(num, decimal) {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(num / 100);
}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorList = ['#a50026','#313695','#f46d43','#74add1','#fee090','#f1b6da','#6a3d9a','#ff7f00','#b2df8a','#cab2d6'];
