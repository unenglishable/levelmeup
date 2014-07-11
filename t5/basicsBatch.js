var level = require('level');
var fs = require('fs');
var file = process.argv[3];

fs.readFile(file, function (err, data) {
  if (err) error(err);
  var lines = data.toString().split('\n');

  var db = level(process.argv[2], function() {
    var batch = db.batch();
    lines.forEach(function (line) {
      line = line.split(',');
      if (line[0] === 'put') {
        batch.put(line[1], line[2]);
      }
      else if (line[0] === 'del') {
        batch.del(line[1]);
      }
      else {
        console.log('Oh shit!');
      }
    });
    batch.write();
  });
});
