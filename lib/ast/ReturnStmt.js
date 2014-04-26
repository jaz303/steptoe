var T = require('traitor');

var ReturnStmt = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function() {
            this.returnValue = null;
        },

        setReturnValue: function(returnValue) {
        	this.returnValue = returnValue;
        }

    }

)
