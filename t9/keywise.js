var level = require('level');
var jsonObjects = require(process.argv[3]);

var db = level(process.argv[2], { valueEncoding: 'json'}, function() {
  var batch = db.batch();
  jsonObjects.forEach(function (jsonObject) {
    if (jsonObject.type === 'user') {
      batch.put(jsonObject.name, jsonObject);
    }
    else if (jsonObject.type === 'repo') {
      batch.put(jsonObject.user+'!'+jsonObject.name, jsonObject);
    }
    else {
      console.error('jsonObject type does not match any patterns');
    }
  });
  batch.write();
});
