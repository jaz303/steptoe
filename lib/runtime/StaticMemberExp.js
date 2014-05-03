var T = require('traitor');

var StaticMemberExp = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').STATIC_MEMBER_EXP,
        
        __construct: function(object, property) {
            this.object = object;
            this.property = property;
        },

        newFrame: function() {
            return { state: 0 };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.object);
                frame.state = 1;
            } else {
                vm.ret(vm.retVal[this.property]);
            }
        }
    
    }

)
