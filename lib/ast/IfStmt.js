var T = require('traitor');

var IfStmt = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').IF_STMT,
        
        __construct: function() {
            this.clauses = [];
        },

        addClause: function(clause) {
        	this.clauses.push(clause);
        }

    }

)
