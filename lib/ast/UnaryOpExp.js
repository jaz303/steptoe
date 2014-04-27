var T = require('traitor');

var UnaryOpExp = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').UNARY_OP_EXP,
        
        __construct: function(op, exp) {
            this.op = op;
            this.exp = exp;
        }

    }

)
