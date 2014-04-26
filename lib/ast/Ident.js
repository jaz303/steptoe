var T = require('traitor');

var Ident = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function(name) {
            this.name = name;
        }

    }

)
