var level = require('level');
var db = level(process.argv[2]);

function dbPrintResult(i) {
  db.get('key'+i.toString(), function (err, value) {
    if (err) {
      if (err.notFound) {
        //console.log('Entry ' + key + ' was not found.');
      }
      else {
        throw err;
      }
    }
    else {
      console.log('key' + i.toString() + '=' + value);
    }
  });
}

for (var i = 0; i <= 100; i++) {
  dbPrintResult(i);
}
