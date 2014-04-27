var T = require('traitor');

var UnaryOpExp = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function(op, exp) {
            this.op = op;
            this.exp = exp;
        }

    }

)
