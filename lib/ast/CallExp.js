var T = require('traitor');
var E = require('lexical-env');
var types = require('./types');

var CallExp = module.exports = T.make(

    [ 'st:emitter' ], {

        type: types.CALL_EXP,
        
        __construct: function(callee, args) {
            this.callee = callee;
            this.args = args;
        },

        newFrame: function() {
            return {
                ix: 0,
                args: [],
                argIx: 0,
                nativeReturn: null
            };
        },

        step: function(frame, env, vm) {

            if (frame.ix === 0) {
                if (frame.argIx > 0) {
                    frame.args.push(vm.retVal);
                }
                if (frame.argIx >= this.args.length) {
                    frame.ix = 1;
                } else {
                    vm.evaluate(this.args[frame.argIx++]);
                    return;
                }
            }

            if (frame.ix === 1) {
                vm.evaluate(this.callee);
                frame.ix = 2;
                return;
            } else if (frame.ix === 2) {
                var callee = vm.retVal;

                if (typeof callee === 'function') {
                    
                    frame.nativeReturn = callee.apply(vm, frame.args);
                    frame.ix = 3;

                } else if (callee.type === types.FUNCTION_INSTANCE) {

                    var params = callee.fn.params;
                    if (params.length !== frame.args.length) {
                        throw new Error("argument mismatch");
                    }
                    
                    var newEnv = E.create(callee.env);
                    params.forEach(function(p, ix) {
                        E.def(newEnv, p, frame.args[ix]);
                    });

                    vm.pushEnv(newEnv);
                    vm.evaluate(callee);
                    frame.ix = 4;
                    
                } else {
                    throw new Error("callee is not a function!");
                }
            } else if (frame.ix === 3) {
                vm.ret(frame.nativeReturn);
            } else if (frame.ix === 4) {
                vm.ret(vm.retVal);
            }

        }
    
    }

)
