var T = require('traitor');

var CallExp = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').CALL_EXP,
        
        __construct: function(callee, args) {
            this.callee = callee;
            this.args = args;
        }
	
	}

)
