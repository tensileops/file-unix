function File(path, options) {
  options = options || {};
  this.path = path;
  this.type = undefined;
  this.size = undefined;
}

File.prototype.write = function(sh, src, cb) {
  sh.put(src, this.path, function(err) {
    if (err) { return cb(err); }
    return cb();
  });
  
  
  // TODO: Re-implement this
  /*
  var self = this
    , content = options.content;
  
  c.ftp(function(err, ftp) {
    if (err) { return cb(err); }
    
    // FIXME: This event doesn't seem to be emitted by `ssh2.SFTP`.
    ftp.on('end', function() {
    });
  
    var ws = ftp.createWriteStream(self.path);
    ws.on('close', function() {
      // FIXME: Invoking `end` does not seem to trigger the `end` event (see above).
      //ftp.end();
      return cb();
    });
    ws.on('error', function(err) {
      return cb(err);
    });
    
    ws.write(content);
    ws.end();
  });
  */
}


module.exports = File;
