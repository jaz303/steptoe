var T = require('traitor');

var PrimitiveLiteral = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').PRIMITIVE_LITERAL,
        
        __construct: function(value) {
            this.value = value;
        },

        newFrame: function() {
            return null;
        },

        step: function(state, env, vm) {
            vm.ret(this.value);
        }

    }

)
