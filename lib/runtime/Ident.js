var T = require('traitor');

var Ident = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').IDENT,
        
        __construct: function(name) {
            this.name = name.toLowerCase().replace(/_/g, '');
            this.displayName = name;
        },

        getName: function() {
            return this.name;
        },

        getDisplayName: function() {
            return this.displayName;
        },

        newFrame: function() {
            return null;
        },

        step: function(frame, env, vm) {
            vm.ret(env.get(this.name));
        }

    }

)
