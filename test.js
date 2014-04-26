var fs = require('fs');
var parser = require('./lib/parser');

var T = require('traitor');
T.register('st:emitter', function() {
	
});

var src = fs.readFileSync('test.stp', 'utf8');

var parsed = parser.parse(src);

var inspect = require('util').inspect;

console.log(inspect(parsed, {depth: null, colors: true}));
