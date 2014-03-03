var test = require('tape');

var Spec = require('./lib/amf/spec.js');
var Stream = require('./lib/io/stream.js');
var InputStream = require('./lib/io/input.js');
var OutputStream = require('./lib/io/output.js');
var AMF = require('./lib/amf/amf.js');

test('undefined', function(t) {
  t.plan(1);

  t.equal(AMF.deserialize(AMF.serialize()), undefined);
});

test('null', function(t) {
  t.plan(1);

  t.equal(AMF.deserialize(AMF.serialize(null)), null);
});

test('false', function(t) {
  t.plan(1);

  t.equal(AMF.deserialize(AMF.serialize(false)), true);
});

test('true', function(t) {
  t.plan(1);

  t.equal(AMF.deserialize(AMF.serialize(true)), true);
});

test('int', function(t) {

  var samples = [5, 100, -100, Spec.MIN_INT, Spec.MAX_INT, -109876983];
  t.plan(samples.length + 1);

  for(var i in samples) {
    var sample = samples[i];
    t.equal(AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_INT)), sample);
  }

  t.throws(function() {
    AMF.serialize(Spec.MAX_INT + 1, true, Spec.AMF3_INT);
  }, RangeError, 'should throw RangeError')

});

test('double', function(t) {
  t.plan(7);

  var samples = [-10, 0.3767574, Spec.MIN_INT, Spec.MAX_INT, Math.PI, Number.MAX_VALUE, Number.MIN_VALUE, 102.145];
  t.plan(samples.length);

  for(var i in samples) {
    var sample = samples[i];
    t.equal(AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_DOUBLE)), sample);
  }
});