var T = require('traitor');

var PrimitiveLiteral = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').PRIMITIVE_LITERAL,
        
        __construct: function(value) {
            this.value = value;
        }

    }

)
