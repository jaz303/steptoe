var T = require('traitor');

var ComputedMemberExp = module.exports = T.make(

    [ 'events' ], {

        type: require('./types').COMPUTED_MEMBER_EXP,
        
        __construct: function(object, property) {
            this.object = object;
            this.property = property;
        },

        getObject: function() {
            return this.object;
        },

        getProperty: function() {
            return this.property;
        },

        newFrame: function() {
            return { state: 0, object: null };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.object);
            } else if (frame.state === 1) {
                frame.object = vm.retVal;
                vm.evaluate(this.property);
            } else {
                vm.ret(frame.object[vm.retVal]);
            }
            frame.state++;
        }
    
    }

)
