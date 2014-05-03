var T = require('traitor');

var ObjectLiteral = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').OBJECT_LITERAL,
        
        __construct: function() {
            this.keys = [];
            this.values = [];
        },

        addPair: function(key, value) {
            this.keys.push(key);
            this.values.push(value);
        },

        newFrame: function(exp) {
            return { ix: 0, obj: {} };
        },

        step: function(frame, env, vm) {
            if (frame.ix > 0) {
                frame.obj[this.keys[frame.ix-1]] = vm.retVal;
            }
            if (frame.ix < this.keys.length) {
                vm.evaluate(this.values[frame.ix]);
                frame.ix++;
            } else {
                vm.ret(frame.obj);
            }
        }
    
    }

)
