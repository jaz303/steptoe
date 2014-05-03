var T = require('traitor');

var FunctionDef = module.exports = T.make(

    [ 'st:emitter' ], {

        type: require('./types').FUNCTION_DEF,
        
        __construct: function() {
        	this.name = null;
            this.params = null;
            this.variables = null;
            this.innerFunctions = null;
            this.body = null;
        },

        getName: function() {
            return this.name;
        },

        setName: function(name) {
        	this.name = name;
        },

        setParams: function(params) {
        	this.params = params;
        },

        setVariables: function(variables) {
        	this.variables = variables;
        },

        setInnerFunctions: function(innerFunctions) {
        	this.innerFunctions = innerFunctions;
        },

        setBody: function(body) {
        	this.body = body;
        }

    }

)
