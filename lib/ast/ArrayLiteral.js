var T = require('traitor');

var ArrayLiteral = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function() {
            this.expressions = [];
        },

        addExpression: function(exp) {
        	this.expressions.push(exp);
        }

    }

)
