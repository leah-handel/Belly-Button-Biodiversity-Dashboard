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

  var ethnicity = unpack(metaData, "ethnicity");
  console.log(ethnicity);

});

  
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

