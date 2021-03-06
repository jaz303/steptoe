var A = require('./runtime'),
    T = require('./runtime/types');

var Machine = module.exports = function() {};

Machine.prototype = {
    get node() {
        return this.nodes[this.nodes.length-1];
    },

    get env() {
        return this.stack[this.stack.length-1];
    },

    isTruthy: function(val) {
        return !!val;
    }
}

Machine.prototype.restart = function(env, main) {

    // to restart the VM we need to set up a call to the main function

    // let's start with reinitialising everything
    this.nodes = [];        // stack of active AST nodes
    this.frames = [];       // stack of active AST node state
    this.stack = [];        // lexical environments
    this.retVal = null;     // return value from last frame

    // now set up the call and bodge it so it jumps straight to the
    // return step on re-entrance
    var callToMain = new A.CallExp();
    var callToMainFrame = callToMain.newFrame();
    callToMainFrame.ix = 4;

    this.nodes.push(callToMain);
    this.frames.push(callToMainFrame);

    // that's the call set up; next we need to set up the function
    // instance.

    var mainInstance;
    if (main instanceof A.FunctionDef) {
        mainInstance = new A.FunctionInstance(main, env);
    } else if (main instanceof A.FunctionInstance) {
        mainInstance = main;
    } else {
        throw new Error("main must be either FunctionDef or FunctionInstance");
    }

    var mainInstanceFrame = mainInstance.newFrame();

    this.nodes.push(mainInstance);
    this.frames.push(mainInstanceFrame);

    // finally, set up the environment for the main function.
    // to do this we create a new env with the root env as a parent
    // to prevent the root env from being clobbered.

    this.rootEnv = env;
    this.mainEnv = env.beget();

    this.stack = [this.mainEnv];

}

Machine.prototype.isRunning = function() {
    return this.nodes.length > 0;
}

Machine.prototype.ret = function(val) {
    this.nodes.pop();
    this.frames.pop();
    this.retVal = val;
}

// unwind VM stack until we hit the closest function call
Machine.prototype.returnFromFunction = function(val) {
    while (this.nodes[this.nodes.length-1].type !== T.CALL_EXP) {
        this.nodes.pop();
        this.frames.pop();
    }
    this.stack.pop();
    this.retVal = val;
}

Machine.prototype.evaluate = function(node) {
    this.frames.push(node.newFrame());
    this.nodes.push(node);
}

Machine.prototype.pushEnv = function(env) {
    this.stack.push(env);
}

Machine.prototype.step = function() {
    this.nodes[this.nodes.length-1].step(
        this.frames[this.frames.length-1],
        this.env,
        this
    );
}
