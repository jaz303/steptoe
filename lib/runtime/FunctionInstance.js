var FunctionInstance = module.exports = function(fn, env) {
	this.fn = fn;
	this.env = env;
}

FunctionInstance.prototype.newFrame = function() {
	return { ix: 0 };
}

FunctionInstance.prototype.step = function(frame, env, vm) {
	
}


        // newFrame: function() {
        // 	return { ix: 0 };
        // },

        // step: function(frame, env, vm) {
        // 	if (frame.ix >= this.statements.length) {
        // 		vm.ret(null);
        // 	} else {
        // 		vm.evaluate(this.statements[this.ix++]);
        // 	}
        // }