module.exports = function (db, date, callback) {
  var count = 0;
  var rStream = db.createReadStream({
    start: date
  });
  rStream.on('error', function(err) {
    callback(err);
  });
  rStream.on('data', function(data) {
    count++;
  });
  rStream.on('end', function() {
    callback(null, count);
  });
}
