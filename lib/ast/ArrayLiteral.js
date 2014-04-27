var T = require('traitor');

var ArrayLiteral = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').ARRAY_LITERAL,
        
        __construct: function() {
            this.expressions = [];
        },

        addExpression: function(exp) {
        	this.expressions.push(exp);
        }

    }

)
