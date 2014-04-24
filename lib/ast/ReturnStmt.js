var T = require('traitor');

var ReturnStmt = module.exports = T.make(

    [ 'st:emitter' ], {
        
        __construct: function() {
            this.variables  = [];
            this.functions  = [];
            this.statements = [];
        }

    }

)
