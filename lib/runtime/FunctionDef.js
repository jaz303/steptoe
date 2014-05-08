var T = require('traitor');
var FunctionInstance = require('./FunctionInstance');

var FunctionDef = module.exports = T.make(

    [ 'events' ], {

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

        getParams: function() {
            return this.params;
        },

        getVariables: function() {
            return this.variables;
        },

        getInnerFunctions: function() {
            return this.innerFunctions;
        },

        getBody: function() {
            return this.body;
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
        },

        createInstance: function(env) {
            return new FunctionInstance(this, env);
        }

    }

)
