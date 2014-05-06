var T = require('traitor');

var ReturnStmt = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').RETURN_STMT,
        
        __construct: function() {
            this._returnValue = null;
        },

        hasReturnValue: function() {
            return !!this._returnValue;
        },

        getReturnValue: function() {
            return this._returnValue;
        },

        setReturnValue: function(returnValue) {
            this._returnValue = returnValue;
        },

        newFrame: function() {
            return { state: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                if (this._returnValue) {
                    vm.evaluate(this._returnValue);
                    frame.state = 1;
                } else {
                    frame.state = 2;
                }
            } else if (frame.state === 1) {
                vm.returnFromFunction(vm.retVal);
            } else if (frame.state === 2) {
                vm.returnFromFunction(null);
            }
        }

    }

)
