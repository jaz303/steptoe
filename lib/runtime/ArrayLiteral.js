var T = require('traitor');

var ArrayLiteral = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').ARRAY_LITERAL,
        
        __construct: function() {
            this.expressions = [];
        },

        addExpression: function(exp) {
            this.expressions.push(exp);
        },

        getValues: function() {
            return this.expressions;
        },

        newFrame: function(exp) {
            return { ix: 0, ary: [] };
        },

        step: function(frame, env, vm) {
            if (frame.ix > 0) {
                frame.ary.push(vm.retVal);
            }
            if (frame.ix < this.expressions.length) {
                vm.evaluate(this.expressions[frame.ix]);
                frame.ix++;
            } else {
                vm.ret(frame.ary);
            }
        }

    }

)
