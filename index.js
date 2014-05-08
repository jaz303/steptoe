var parser = require('./lib/parser');
var Env = require('./lib/Env');
var FunctionDef = require('./lib/runtime/FunctionDef');

function createEnv() {
	return new Env();
}

function createFunction() {
	return new FunctionDef();
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
    createFunction	: createFunction,

    parseProgram    : parseProgram,
    parseFunction   : parseFunction
};
