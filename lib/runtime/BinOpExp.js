var T = require('traitor');

var OPS = {
    '*'     : function(l, r) { return l * r; },
    '/'     : function(l, r) { return l / r; },
    '%'     : function(l, r) { return l % r; },
    '+'     : function(l, r) { return l + r; },
    '-'     : function(l, r) { return l - r; },
    '<<'    : function(l, r) { return l << r; },
    '>>>'   : function(l, r) { return l >>> r; },
    '>>'    : function(l, r) { return l >> r; },
    '<='    : function(l, r) { return l <= r; },
    '>='    : function(l, r) { return l >= r; },
    '<'     : function(l, r) { return l < r; },
    '>'     : function(l, r) { return l > r; },
    '==='   : function(l, r) { return l === r; },
    '!=='   : function(l, r) { return l !== r; },
    '=='    : function(l, r) { return l == r; },
    '!='    : function(l, r) { return l != r; },
    '&'     : function(l, r) { return l & r; },
    '^'     : function(l, r) { return l ^ r; },
    '|'     : function(l, r) { return l | r; },
};

var BinOpExp = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').BIN_OP_EXP,
        
        __construct: function(left, op, right) {
            this.left = left;
            this.op = op;
            this.right = right;
        },

        newFrame: function() {
            return { state: 0, left: null };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.left);
            } else if (frame.state === 1) {
                frame.left = vm.retVal;
                vm.evaluate(this.right);
            } else {
                if (this.op in OPS) {
                    vm.ret(OPS[this.op](frame.left, vm.retVal));
                } else {
                    throw new Error("runtime error - unsupported op!");
                }
            }
            frame.state++;
        }

    }

)
