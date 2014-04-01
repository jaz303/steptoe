var prog 	= require('./program'),
	A 		= require('./ast_nodes');

function Context() {
	this.frames = [];
	this.nodes = [];
	this.env = {};
}

Context.prototype.ret = function(val) {
	this.retVal = val;
	this.frames.pop();
	this.nodes.pop();
}

Context.prototype.evaluate = function(node) {
	this.frames.push(node.newFrame());
	this.nodes.push(node);
}

Context.prototype.step = function() {
	this.nodes[this.nodes.length-1].step(
		this.frames[this.frames.length-1],
		this.env,
		this
	);
}

var ctx = new Context();
ctx.evaluate(prog);

while (ctx.frames.length) {
	console.log(ctx.frames[ctx.frames.length-1]);
	ctx.step();
}

console.log(ctx.env);