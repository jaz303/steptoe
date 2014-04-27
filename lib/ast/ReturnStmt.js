var T = require('traitor');

var ReturnStmt = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').RETURN_STMT,
        
        __construct: function() {
            this.returnValue = null;
        },

        setReturnValue: function(returnValue) {
        	this.returnValue = returnValue;
        }

    }

)
