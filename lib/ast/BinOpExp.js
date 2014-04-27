var T = require('traitor');

var BinOpExp = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function(left, op, right) {
            this.left = left;
            this.op = op;
            this.right = right;
        }

    }

)
