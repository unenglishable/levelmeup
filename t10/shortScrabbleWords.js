function fillWord (word) {
  while(word.length < 4) {
    word = '!'+word;
  }
  return word;
}

function unfillWord (word) {
  return word.slice(word.lastIndexOf('!')+1,word.length);
}

module.exports.init = function (db, words, callback) {
  var batch = db.batch();
  words.forEach(function (word) {
    batch.put(fillWord(word), word.length);
  });
  batch.write();
  callback(null, db);
}

module.exports.query = function (db, word, callback) {
  var start = fillWord(word);
  var end = start.replace('*','~');
  var matches = [];
  var rStream = db.createReadStream({
    start: start,
      end: end 
  });
  rStream.on('error', function (err) {
    callback(err);
  });
  rStream.on('data', function (data) {
    //console.error('Query: '+word+' Found: '+data.key);
    matches.push(unfillWord(data.key));
  });
  rStream.on('end', function () {
    callback(null, matches);
  });
}
