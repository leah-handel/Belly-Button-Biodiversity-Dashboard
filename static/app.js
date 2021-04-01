function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }


d3.json("static/samples.json").then(function(data) {
    console.log(data);
    var metadata = data.metadata;
    //var ids = metadata.map(subject => subject.id);
    //console.log(ids);
    var demographics = {};
    metadata.forEach(function(subject){
        var id = subject.id;
        demographics[id] = subject;
    })
    console.log(demographics);
});

