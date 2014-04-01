exports.Statements 		= Statements;
exports.Assign 			= Assign;
exports.BinOp 			= BinOp;
exports.Number			= NumberLiteral;
exports.Ident 			= Ident;

var DEBUG = false;

var nextid = 1;
function genid(name) {
	var id = DEBUG ? name : (nextid++);
	exports[name] = id;
	return id;
}

var STATEMENTS 	= genid('STATEMENTS'),
	ASSIGN	 	= genid('ASSIGN'),
	BIN_OP 		= genid('BIN_OP'),
	NUMBER 		= genid('NUMBER'),
	IDENT 		= genid('IDENT');

//
// Statements

function Statements(body) {
	this.type = STATEMENTS;
	this.body = body || [];
}

Statements.prototype.newFrame = function() {
	return { ix: 0 };
}

Statements.prototype.step = function(state, env, ctx) {
	if (state.ix >= this.body.length) {
		ctx.ret(null);
	} else {
		ctx.evaluate(this.body[state.ix++]);
	}
}

//
// Assign

function Assign(left, right) {
	this.left = left;
	this.right = right;
}

Assign.prototype.type = ASSIGN;

Assign.prototype.newFrame = function() {
	return { state: 0 };
}

Assign.prototype.step = function(state, env, ctx) {
	if (state.state === 0) {
		ctx.evaluate(this.right);
	} else if (state.state === 1) {
		env[this.left.name] = ctx.retVal;
	} else {
		ctx.ret(null);
	}
	state.state++;
}

//
//

function BinOp(left, op, right) {
	this.type = BIN_OP;
	this.left = left;
	this.op = op;
	this.right = right;
}

BinOp.prototype.type = BIN_OP;

BinOp.prototype.newFrame = function() {
	return { state: 0, left: null };
}

BinOp.prototype.step = function(state, env, ctx) {
	if (state.state === 0) {
		ctx.evaluate(this.left);
	} else if (state.state === 1) {
		state.left = ctx.retVal;
		ctx.evaluate(this.right);
	} else {
		if (this.op === '+') {
			ctx.ret(state.left + ctx.retVal);
		} else if (this.op === '-') {
			ctx.ret(state.left - ctx.retVal);
		} else {
			throw new Error("runtime error - unsupported op!");
		}
	}
	state.state++;
}

//
//

function NumberLiteral(value) {
	this.type = NUMBER;
	this.value = value;
}

NumberLiteral.prototype.newFrame = function() {
	return null;
}

NumberLiteral.prototype.step = function(state, env, ctx) {
	ctx.ret(this.value);
}

//
//

function Ident(name) {
	this.type = IDENT;
	this.name = name;
}

Ident.prototype.newFrame = function() {
	return null;
}

Ident.prototype.step = function(state, env, ctx) {
	ctx.ret(env[this.name]);
}