function reindex(rawData, newObject) {
  rawData.forEach(function(subject){
    var id = subject.id;
    newObject[id] = subject;
  });
  console.log(newObject);
};

// making the data easier to get into

d3.json("static/samples.json").then(function(data) {
    console.log(data);
    var metadata = data.metadata;
    var demographics = {};
    //var ids = metadata.map(subject => subject.id);
    //console.log(ids);
    
   //metadata.forEach(function(subject){
    //    var id = subject.id;
     //   demographics[id] = subject;
    //});
    //console.log(demographics);
    //console.log(demographics[940]["ethnicity"]); this worked

    var sampleData =  data.samples;
    var samples = {};

    reindex(metadata, demographics);
    reindex(sampleData, samples);

    });




