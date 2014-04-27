var T = require('traitor');

var WhileStmt = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').WHILE_STMT,
        
        __construct: function() {
        	this.condition = null;
        	this.body = null;
        },

        setCondition: function(condition) {
        	this.condition = condition;
        },

        setBody: function(body) {
        	this.body = body;
        }

    }

)
