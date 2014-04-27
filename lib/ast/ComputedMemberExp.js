var T = require('traitor');

var ComputedMemberExp = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').COMPUTED_MEMBER_EXP,
        
        __construct: function(object, property) {
            this.object = object;
            this.property = property;
        }
	
	}

)
