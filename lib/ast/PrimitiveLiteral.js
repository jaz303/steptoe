var T = require('traitor');

var PrimitiveLiteral = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function(value) {
            this.value = value;
        }

    }

)
