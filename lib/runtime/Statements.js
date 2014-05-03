var T = require('traitor');
var types = require('./types');
var ReturnStmt = require('./ReturnStmt');

var Statements = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').STATEMENTS,
        
        __construct: function() {
            this._body = [];
        },

        addFinalReturnStatement: function() {
            if (this._body.length === 0
                || this._body[this._body.length-1].type !== types.RETURN_STMT) {
                this._body.push(new ReturnStmt());
            }
        },

        addStatement: function(statement) {
            this._body.push(statement);
        },

        newFrame: function() {
            return { ix: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.ix >= this._body.length) {
                vm.ret(null);
            } else {
                vm.evaluate(this._body[frame.ix++]);
            }
        }

    }

)
