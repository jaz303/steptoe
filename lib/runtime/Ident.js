var T = require('traitor');

var Ident = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').IDENT,
        
        __construct: function(name) {
            this.name = name;
        },

        getName: function() {
            return this.name;
        },

        newFrame: function() {
            return null;
        },

        step: function(frame, env, vm) {
            vm.ret(env.get(this.name));
        }

    }

)
