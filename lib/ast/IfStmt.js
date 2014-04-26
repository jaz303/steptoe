var T = require('traitor');

var IfStmt = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function() {
            this.clauses = [];
        },

        addClause: function(clause) {
        	this.clauses.push(clause);
        }

    }

)
