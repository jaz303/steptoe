var A                   = require('./ast'),
    T                   = require('./ast/types'),
    env                 = require('lexical-env'),
    FunctionInstance    = require('./runtime/FunctionInstance');

//
// Context

// var ctx = new Context();
// ctx.evaluate(prog);

// E.def(ctx.env, 'a', 0);
// E.def(ctx.env, 'b', 0);
// E.def(ctx.env, 'i', 0);
// E.def(ctx.env, 'z', 0);

// while (ctx.frames.length) {
//     console.log(ctx.frames[ctx.frames.length-1]);
//     ctx.step();
// }

// console.log(ctx.env);

function Machine(rootEnv) {

    // evaluation frames; one entry per AST node
    this.evalStack = [];

    // nodes
    this.nodeStack = [];

    // 
    this.stack = [];
    
}

Machine.prototype = {
    get node() {
        return this.nodeStack[this.nodeStack.length-1];
    },

    get env() {
        return this.stack[this.stack.length-1];
    },

    restart: function(fn, env) {
        var fi = new FunctionInstance(fn, rootEnv);
        fi.enter(this);
    },

    isTruthy: function(val) {
        return !!val;
    }
}



Machine.prototype.restart = function(fn) {
    this.enterNode(env.get(this.env, fn));
}

Machine.prototype.isRunning = function() {
    return this.evalStack.length > 0;
}

Machine.prototype.enterNode = function() {

}

Machine.prototype.ret = function(val) {
    this.retVal = val;
    this.frames.pop();
    this.nodes.pop();
}

Machine.prototype.evaluate = function(node) {
    this.frames.push(node.newFrame());
    this.nodes.push(node);
}

Machine.prototype.step = function() {
    this.nodes[this.nodes.length-1].step(
        this.frames[this.frames.length-1],
        this.env,
        this
    );
}

//
// 

module.exports = function(functions) {

    var rootEnv = env.create();

    env.def(rootEnv, '_nativePrint', function(message) {
        console.log(message);
    });

    functions.forEach(function(fun) {
        env.def(rootEnv, fun.getName(), fun);
    });

    vm.restart(env.get(rootEnv, 'main'), rootEnv);

    while (vm.isRunning()) {
        vm.step();
    }

}
