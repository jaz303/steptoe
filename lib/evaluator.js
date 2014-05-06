var A       = require('./runtime'),
    T       = require('./runtime/types'),
    Env     = require('./Env'),
    Machine = require('./Machine')

module.exports = function(functions) {

    var rootEnv = new Env();

    rootEnv.def('_nativePrint', function(message) {
        console.log(message);
    });

    functions.forEach(function(fun) {
        rootEnv.def(fun.getName(), new A.FunctionInstance(fun, rootEnv));
    });

    var vm = new Machine();
    vm.restart(rootEnv, rootEnv.get('main'));

    while (vm.isRunning()) {
        vm.step();
    }

    console.log(vm.mainEnv);

}
