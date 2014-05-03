var T = require('traitor');
var E = require('lexical-env');
var types = require('./types');

var AssignExp = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').ASSIGN_EXP,
        
        __construct: function() {
        	this.left = null;
        	this.right = null;
        },

        setLeft: function(left) {
        	this.left = left;
        },

        setRight: function(right) {
        	this.right = right;
        },

        newFrame: function() {
            return { state: 0, value: null };
        },

        step: function(frame, env, vm) {
            if (frame.state === 0) {
                vm.evaluate(this.right);
                if (this.left.type === types.IDENT) {
                    frame.state = 1;
                } else if (this.left.type === types.COMPUTED_MEMBER_EXP) {
                    frame.state = 2;
                } else if (this.left.type === types.STATIC_MEMBER_EXP) {
                    frame.state = 5;
                }
            } else if (frame.state === 1) {
                E.set(env, this.left.name, vm.retVal);
                vm.ret(vm.retVal);
            } else if (frame.state === 2) {
                frame.value = vm.retVal;
                vm.evaluate(this.left.object);
                frame.state = 3;
            } else if (frame.state === 3) {
                frame.object = vm.retVal;
                vm.evaluate(this.left.property);
                frame.state = 4;
            } else if (frame.state === 4) {
                frame.object[vm.retVal] = frame.value;
                vm.ret(frame.value);
            } else if (frame.state === 5) {
                frame.value = vm.retVal;
                vm.evaluate(this.left.object);
                frame.state = 6;
            } else if (frame.state === 6) {
                vm.retVal[this.left.property] = frame.value;
                vm.ret(frame.value);
            }
        }

	}

)
