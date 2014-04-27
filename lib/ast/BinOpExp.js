var T = require('traitor');

var BinOpExp = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').BIN_OP_EXP,
        
        __construct: function(left, op, right) {
            this.left = left;
            this.op = op;
            this.right = right;
        }

    }

)
