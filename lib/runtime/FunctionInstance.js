var T = require('traitor');

var FunctionInstance = module.exports = T.make(

    [ 'events' ], {

        steptoeFunctionInstance: true,
        type: require('./types').FUNCTION_INSTANCE,
        
        __construct: function(fn, env) {
            this.fn = fn;
            this.env = env;
        },

        getFunction: function() {
            return this.fn;
        },

        getEnv: function() {
            return this.env;
        },

        newFrame: function() {
            return { ix: 0 };
        },

        toString: function() {
            return '[FunctionInstance]';
        },

        step: function(frame, env, vm) {
            if (frame.ix === 0) {
                frame.ix++;
                if (this.fn.variables) {
                    vm.evaluate(this.fn.variables);
                    return;
                }
            }

            if (frame.ix === 1) {
                frame.ix++;
                if (this.fn.innerFunctions) {
                    vm.evaluate(this.fn.innerFunctions);
                    return;
                }
            }

            if (frame.ix === 2) {
                frame.ix++;
                vm.evaluate(this.fn.body);
                return;
            }

            if (frame.ix === 3) {
                vm.ret(vm.retVal);
                return;
            }
        }

    }

)
