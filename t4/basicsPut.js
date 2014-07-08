var level = require('level');
var db = level(process.argv[2]);
var properties = JSON.parse(process.argv[3]);

for (var key in properties) {
  db.put(key, properties[key]);
}
