var T = require('traitor');

var WhileStmt = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').WHILE_STMT,
        
        __construct: function() {
            this.condition = null;
            this.body = null;
        },

        getCondition: function() {
            return this.condition;
        },

        setCondition: function(condition) {
            this.condition = condition;
        },

        getBody: function() {
            return this.body;
        },

        setBody: function(body) {
            this.body = body;
        },

        newFrame: function() {
            return { state: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.condition);
                frame.state = 1;
            } else {
                if (vm.isTruthy(vm.retVal)) {
                    vm.evaluate(this.body);
                    frame.state = 0;
                } else {
                    vm.ret();
                }
            }
        }

    }

)
