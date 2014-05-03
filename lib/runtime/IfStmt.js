var T = require('traitor');

var IfStmt = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').IF_STMT,
        
        __construct: function() {
            this.conditions = [];
            this.bodies = [];
        },

        addClause: function(condition, body) {
            this.conditions.push(condition);
            this.bodies.push(body);
        },

        newFrame: function() {
            return { state: 0, ix: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                if (this.conditions[frame.ix]) {
                    vm.evaluate(this.conditions[frame.ix]);
                    frame.state = 1;
                } else {
                    vm.evaluate(this.bodies[frame.ix]);
                    frame.state = 2;
                }
            } else if (frame.state === 1) {
                if (vm.isTruthy(vm.retVal)) {
                    vm.evaluate(this.bodies[frame.ix]);
                    frame.state = 2;
                } else {
                    frame.state = 0;
                    frame.ix++;
                    if (frame.ix >= this.conditions.length) {
                        vm.ret(null);
                    }
                }
            } else {
                vm.ret(null);
            }
        }

    }

)
