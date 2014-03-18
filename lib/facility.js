var File = require('./file');


exports.read = function(sh, desc, cb) {
  console.log('READ FILE!');
  console.log(desc);
  
  
  sh.exec('stat ' + desc.file).then(function(io) {
    var stdout = io[0];
  }, function(err) {
    if (err.code == 1) {
      // no such file
      return cb(null, new File(desc.file));
    } else {
      return cb(err);
    }
  });
};

exports.apply = function(sh, f, desc, cb) {
  console.log('APPLY FILE')
  console.log(desc);
  
  switch (desc.state) {
  default:
    f.write(sh, desc.src, function(err) {
      // TODO: Set permissions, as necessary
      if (err) { return cb(err); }
      return cb();
    });
  }
};
