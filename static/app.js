function newUnpack(rows, index) {
  var newObject = {}
  rows.forEach(function(row){
    var id = row["id"];
    var value =  row[index];
    newObject[id]=value;
  });
  return newObject;
}

var url = "static/samples.json"

d3.json(url).then(function(data) {

  var metaData = data.metadata;
  var ids = metaData.map(d=>d.id);

  var dropDown = d3.selectAll("#selDataset");

  ids.forEach(function(id) {
    var entry = dropDown.append("option");
    entry.text(id);
    entry.attr("value", id);
  })

  // unpacking demographic data
  var ethnicity = newUnpack(metaData, "ethnicity");
  ethnicity["stat"] = "ethnicity"; //stat is to pull text for the demographics list

  var gender = newUnpack(metaData, "gender");
  gender["stat"] = "gender";

  var age = newUnpack(metaData, "age");
  age["stat"] = "age";

  var location = newUnpack(metaData, "location");
  location["stat"] = "location";

  var bbtype = newUnpack(metaData, "bbtype");
  bbtype["stat"] = "bbtype";

  var wfreq = newUnpack(metaData, "wfreq");
  wfreq["stat"] = "wfreq";

  attributes = [ethnicity, gender, age, location, bbtype, wfreq];

  starter = 940; //subject to populate the initial page load

  // demographics table

  var demoList = d3.select("#demo-list");

 demoList.selectAll("li")
  .data(attributes)
  .enter()
  .append("li")
  .text(function(d) {
    return `${d.stat}: ${d[starter]}`;
  })
  .exit()
  .remove();

  // bar chart

  var otuIDs = newUnpack(data.samples, "otu_ids");
  var otuLabels = newUnpack(data.samples, "otu_labels");
  var sampleValues = newUnpack(data.samples, "sample_values");

  //already in order, can just slice ten values

  var barHeights = sampleValues[starter].slice(0,10);
  var otuNames = otuIDs[starter].slice(0,10);
  var barTicks = otuNames.map(d=>`OTU ${d}`);
  var barHover = otuLabels[starter].slice(0,10);
  var yAxis = [9,8,7,6,5,4,3,2,1,0];
  
  //building bar chart

  var trace1 = {
    x: barHeights,
    y: yAxis,
    type: "bar",
    orientation: "h",
    text: barHover
  };

  var layout1 = {
    title: 'Top Microbes',
    yaxis: {
      tickvals: yAxis,
      ticktext: barTicks
    },
    xaxis: {
      title: {
        text: 'Number in Sample',
      }
    }
  };

  Plotly.newPlot("bar", [trace1], layout1);

  // building bubble chart
  var maxMarker = 50;
  var size = sampleValues[starter];
  var sizeRef = 2.0 * Math.max(...size) / (maxMarker**2);

  // size ref formula suggested in the the plotly documentation: https://plotly.com/javascript/bubble-charts/

  var color = otuIDs[starter].map(x => `rgb(${x/17},0,${255-x/17})`);

  var trace2 = {
  x: otuIDs[starter],
  y: sampleValues[starter],
  text: otuLabels[starter],
  mode: 'markers',
  marker: {
    size: size,
    sizeref: sizeRef,
    sizemode: 'area',
    color: color
  },
  };

  var layout2 = {
    title: 'Microbe Prevalence',
    xaxis: {
      title: {
        text: 'OTU ID',
    }},
    yaxis: {
      title: {
        text: 'Number in Sample',
    }}
  };

  Plotly.newPlot("bubble", [trace2], layout2);

  //handle change function for drop down selection

  function handleChange() {

    var selection = dropDown.property("value");

    //update the demographic data

    demoList.selectAll("li")
    .text(function(d) {
    return `${d.stat}: ${d[selection]}`;
    });

    //update the bar chart

    barHeights = sampleValues[selection].slice(0,10);
    otuNames = otuIDs[selection].slice(0,10);
    barTicks = otuNames.map(d=>`OTU ${d}`);
    barHover = otuLabels[selection].slice(0,10);

    Plotly.restyle("bar", "x", [barHeights]);
    Plotly.restyle("bar", "text", [barHover]);

    var newBarLayout = {
      'yaxis.tickvals': yAxis,
      'yaxis.ticktext': barTicks // the ticktext didn't like not having tickvals also passed in
    };

    Plotly.relayout("bar", newBarLayout);

    //update the bubble chart

    //data

    Plotly.restyle("bubble", "x", [otuIDs[selection]]);
    Plotly.restyle("bubble", "y", [sampleValues[starter]]);
    Plotly.restyle("bubble", "text", [otuLabels[starter]]);

    //bubbles

    size = sampleValues[selection];
    sizeRef = 2.0 * Math.max(...size) / (maxMarker**2);
    color = otuIDs[selection].map(x => `rgb(${x/17},0,${255-x/17})`);

    Plotly.restyle("bubble", "marker.size", [size]);
    Plotly.restyle("bubble", "marker.sizeref", [sizeRef]);
    Plotly.restyle("bubble", "marker.color", [color]);
  }

  //event watcher:
  dropDown.on("change", handleChange);

});