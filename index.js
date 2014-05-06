var parser = require('./lib/parser');

function createEnv() {
	return new Env();
}

function parseProgram(src) {
    return parser.parse(src, {startRule: 'Program'});
}

function parseFunction(src) {
    return parser.parse(src, {startRule: 'FunctionDef'});
}

module.exports = {
    Machine         : require('./lib/Machine'),
    SyntaxError     : parser.SyntaxError,

    createEnv 		: createEnv,
    parseProgram    : parseProgram,
    parseFunction   : parseFunction
};
