var T = require('traitor');

var ObjectLiteral = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function() {
            this.keys = [];
            this.values = [];
        },

        addPair: function(key, value) {
        	this.keys.push(key);
        	this.values.push(value);
        }
	
	}

)
