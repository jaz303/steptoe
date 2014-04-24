var fs = require('fs');
var parser = require('./lib/parser');

var T = require('traitor');
T.register('st:emitter', function() {
	
});

var src = fs.readFileSync('test.stp', 'utf8');

parser.parse(src);
