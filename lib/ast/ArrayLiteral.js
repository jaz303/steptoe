var T = require('traitor');

var ArrayLiteral = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function() {
            this.variables  = [];
            this.functions  = [];
            this.statements = [];
        }

    }

)
