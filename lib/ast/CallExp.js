var T = require('traitor');

var CallExp = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function(callee, args) {
            this.callee = callee;
            this.args = args;
        }
	
	}

)
