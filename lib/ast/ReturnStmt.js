var T = require('traitor');

var ReturnStmt = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').RETURN_STMT,
        
        __construct: function() {
            this.returnValue = null;
        },

        setReturnValue: function(returnValue) {
        	this.returnValue = returnValue;
        },

        newFrame: function() {
        	return { state: 0 };
        },

        step: function(frame, env, vm) {
        	if (frame.state === 0) {
        		if (this.returnValue) {
        			vm.evaluate(this.returnValue);
        			frame.state = 1;
        		} else {
        			frame.state = 2;
        		}
        	} else if (frame.state === 1) {
        		// ...
        	} else if (frame.state === 2) {
        		// ...
        	}
        }

    }

)
