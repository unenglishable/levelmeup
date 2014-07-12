module.exports = function (db, date, callback) {
  var tweets = [];
  var rStream = db.createReadStream({
    start: date,
      end: date+'\xff'
  });
  rStream.on('error', function(err) {
    callback(err);
  });
  rStream.on('data', function(data) {
    tweets.push(data.value);
  });
  rStream.on('end', function() {
    callback(null, tweets);
  });
}
