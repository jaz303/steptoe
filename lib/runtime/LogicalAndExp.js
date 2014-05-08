var T = require('traitor');

var LogicalAndExp = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').LOGICAL_AND_EXP,
        
        __construct: function(left, right) {
            this.left = left;
            this.right = right;
        },

        getLeft: function() {
            return this.left;
        },

        getRight: function() {
            return this.right;
        },

        newFrame: function() {
            return { state: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.left);
            } else if (frame.state === 1) {
                if (!vm.isTruthy(vm.retVal)) {
                    vm.ret(false);
                } else {
                    vm.evaluate(this.right);
                }
            } else if (frame.state === 2) {
                vm.ret(vm.retVal);
            }
            frame.state++;
        }

    }

)
