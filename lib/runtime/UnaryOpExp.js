var T = require('traitor');

var OPS = {
    '+'     : function(v) { return +v; },
    '-'     : function(v) { return -v; },
    '~'     : function(v) { return ~v; },
    '!'     : function(v) { return !v; }
};

var UnaryOpExp = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').UNARY_OP_EXP,
        
        __construct: function(op, exp) {
            this.op = op;
            this.exp = exp;
        },

        newFrame: function() {
            return { state: 0 }
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.exp);
            } else if (frame.state === 1) {
                if (this.op in OPS) {
                    vm.ret(OPS[this.op](vm.retVal));
                } else {
                    throw new Error("runtime error - unknown operation: " + this.op);
                }
            }
            frame.state++;
        }

    }

);
