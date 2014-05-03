var T = require('traitor');
var E = require('lexical-env');

var Ident = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').IDENT,
        
        __construct: function(name) {
            this.name = name;
        },

        newFrame: function() {
        	return null;
        },

        step: function(frame, env, vm) {
            vm.ret(E.get(env, this.name));
        }

    }

)
