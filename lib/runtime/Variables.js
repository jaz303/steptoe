var T = require('traitor');

var Variables = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').VARIABLES,
        
        __construct: function() {
            this.names = [];
            this.initialValues = [];
        },

        addVariable: function(name, initialValue) {
            this.names.push(name);
            this.initialValues.push(initialValue);
        },

        newFrame: function() {
            return { ix: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.ix > 0) {
                if (this.initialValues[frame.ix-1]) {
                    env.def(this.names[frame.ix-1], vm.retVal);
                } else {
                    env.def(this.names[frame.ix-1], null);
                }
            }
            if (frame.ix < this.names.length) {
                if (this.initialValues[frame.ix]) {
                    vm.evaluate(this.initialValues[frame.ix]);
                } else {
                    // no-op
                }
                frame.ix++;
            } else {
                vm.ret();
            }
        }
    
    }

)
