var T = require('traitor');

var Statements = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').STATEMENTS,
        
        __construct: function() {
            this.statements = [];
        },

        addStatement: function(statement) {
        	this.statements.push(statement);
        }

    }

)
