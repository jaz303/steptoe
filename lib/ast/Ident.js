var T = require('traitor');

var Ident = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').IDENT,
        
        __construct: function(name) {
            this.name = name;
        }

    }

)
