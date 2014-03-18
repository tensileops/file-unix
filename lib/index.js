exports = module.exports = function() {

  return function apt(host, sh, done) {
    host.facility('file', require('./facility'));
    return done();
  }
}
