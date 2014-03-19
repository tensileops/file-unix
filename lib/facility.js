var File = require('./file');


exports.read = function(sh, desc, cb) {
  console.log('READ FILE!');
  console.log(desc);
  
  
  sh.exec('stat ' + desc.dest).then(function(io) {
    var stdout = io[0];
    
    var size = /$\s+Size:\s+(\d+)/m
      , type = /\sIO Block:\s+\d+\s+(.+)$/m
      , modify = /^Modify:\s+(.+)$/m
      , match;
    
    var file = new File(desc.dest);
    match = type.exec(stdout);
    if (match) {
      if (match[1].match(/regular file/)) {
        file.type = 'file';
      }
    }
    match = size.exec(stdout);
    if (match) {
      file.size = parseInt(match[1]);
    }
    
    return cb(null, file);
  }, function(err) {
    if (err.code == 1) {
      // no such file
      return cb(null, new File(desc.dest));
    } else {
      return cb(err);
    }
  });
};

exports.apply = function(sh, f, desc, cb) {
  console.log('APPLY FILE')
  console.log(desc);
  
  // TODO: Only write if needed (md5 sum)
  // TODO: set permissions
  
  switch (desc.state) {
  default:
    f.write(sh, desc.src, function(err) {
      // TODO: Set permissions, as necessary
      if (err) { return cb(err); }
      return cb();
    });
  }
};
