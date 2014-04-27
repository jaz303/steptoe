var T = require('traitor');

var StaticMemberExp = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').STATIC_MEMBER_EXP,
        
        __construct: function(object, property) {
            this.object = object;
            this.property = property;
        }
	
	}

)
