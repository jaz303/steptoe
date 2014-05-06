var fs = require('fs');
var parser = require('./lib/parser');

var src = fs.readFileSync('test.stp', 'utf8');

var parsed = parser.parse(src, {
	startRule: 'Program'
});

require('./lib/evaluator')(parsed);