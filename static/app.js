function reindex(rawData) {
  var newObject = {};
  rawData.forEach(function(subject){
    var id = subject.id;
    newObject[id] = subject;
  });
  return newObject;
}

function unpack(rows, index) {
  return rows.map(function(row) {
    var id = row["id"];
    var value =  row[index];
    var newObject = {};
    newObject[id]=value;
    return newObject;
  });
}

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
// making the data easier to get into
d3.json(url).then(function(data) {
  console.log(data);

  var metaData = data.metadata;
  var ids = metaData.map(d=>d.id);
  console.log(ids);

  var dropDown = d3.select("#selDataset");

  ids.forEach(function(id) {
    var entry = dropDown.append("option");
    entry.text(id);
  })

  var ethnicity = newUnpack(metaData, "ethnicity");
  ethnicity["stat"] = "ethnicity";

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

  starter = 940;

  var demoList = d3.select("#sample-metadata");

 demoList.selectAll("div")
  .data(attributes)
  .enter()
  .append("div")
  .classed("row", true)
  .text(function(d) {
    return `${d.stat}: ${d[starter]}`;
  })
  .exit()
  .remove();


  var otuIDs = newUnpack(data.samples, "otu_ids");
  var otuLabels = newUnpack(data.samples, "otu_labels");
  var sampleValues = newUnpack(data.samples, "sample_values");

  console.log(otuIDs);

  //already in order, can just slice ten values

  var barHeights = sampleValues[starter].slice(0,10);
  var otuNames = otuIDs[starter].slice(0,10);
  var barTicks = otuNames.map(d=>`OTU ${d}`);
  var barHover = otuLabels[starter].slice(0,10);
  var yAxis = [0,1,2,3,4,5,6,7,8,9];

  console.log(otuNames);
  console.log(barTicks);

  var trace1 = {
    x: barHeights,
    y: yAxis,
    type: "bar",
    orientation: "h",
    text: barHover
  };

  var layout = {
    title: 'Top Microbes',
    yaxis: {
      tickvals: yAxis,
      ticktext: barTicks
    }
  };

  Plotly.newPlot("bar", [trace1], layout);


});


  //attributes.forEach(function (a) {
  //  string = `${a.stat}: ${a[starter]}`
  //  console.log(string);
  //  var line = demoList.append("div");
  //  line.classed("row");
  //  line.text(string);
  //});
  
  //var demographics = reindex(metaData);

  //var sampleData =  data.samples;
  //var samples = reindex(sampleData);


    //var demographics = {};
    //var ids = metadata.map(subject => subject.id);
    //console.log(ids);
    
   //metadata.forEach(function(subject){
    //    var id = subject.id;
     //   demographics[id] = subject;
    //});
    //console.log(demographics);
    //console.log(demographics[940]["ethnicity"]); this worked


    //reindex(sampleData, samples);

  //console.log(demographics);
 // console.log(samples);

  //

  //demographics.forEach(function(subject) {
    //var entry = dropDown.append("option");
    //console.log(object.keys(subject));
  //});

  //

  //dropDown.selectAll("option")
   // .data(demographics)
    //.enter()
   // .append("option")
   // .attr("value", function(d) {
    //  console.log(d["id"]);
    //  return d["id"];
   // })
    //.text(function(d) {
   //   return d.id;
   // })
    //.exit()
   // .remove();

