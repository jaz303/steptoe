var T = require('traitor');
var E = require('lexical-env');
var FunctionInstance = require('../runtime/FunctionInstance');

var Functions = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').FUNCTIONS,
        
        __construct: function() {
            this.functions = [];
        },

        addFunction: function(fun) {
            this.functions.push(fun);
        },

        newFrame: function() {
            return { ix: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.ix > 0) {
                var fn = this.functions[frame.ix-1];
                E.def(env, fn.getName(), new FunctionInstance(fn, env));
            }
            if (frame.ix < this.functions.length) {
                // no-op
                frame.ix++;
            } else {
                vm.ret();
            }
        }
    
    }

)
