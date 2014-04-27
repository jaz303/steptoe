var T = require('traitor');

var AssignExp = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').ASSIGN_EXP,
        
        __construct: function() {
        	this.left = null;
        	this.right = null;
        },

        setLeft: function(left) {
        	this.left = left;
        },

        setRight: function(right) {
        	this.right = right;
        }

	}

)
