const Module = require('module');

const preFunc = Module._extensions['.js'];

Module._extensions['.js'] = function (...args) {
    console.log('load script');
    preFunc.apply(preFunc, args);
}

Module._extensions['.nmsl'] = Module._extensions['.js'];

const result = require('./module2');
console.log(result);