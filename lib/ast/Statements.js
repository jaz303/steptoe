var T = require('traitor');

var Statements = module.exports = T.make(

    [ 'st:emitter' ], {

    	type: require('./types').STATEMENTS,
        
        __construct: function() {
            this.statements = [];
        },

        addStatement: function(statement) {
        	this.statements.push(statement);
        },

        newFrame: function() {
        	return { ix: 0 };
        },

        step: function(frame, env, vm) {
        	if (frame.ix >= this.statements.length) {
        		vm.ret(null);
        	} else {
        		vm.evaluate(this.statements[this.ix++]);
        	}
        }

    }

)
