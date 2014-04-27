var T = require('traitor');

var ComputedMemberExp = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function(object, property) {
            this.object = object;
            this.property = property;
        }
	
	}

)
