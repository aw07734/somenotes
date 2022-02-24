const vm = require('vm');
const path = require('path');
const fs = require('fs');

function r(filename) {
    const pathToFile = path.resolve(__dirname, filename);
    const content = fs.readFileSync([pathToFile, `${pathToFile}.js`].find(fs.existsSync), 'utf-8');

    const wrapper = [
        '(function(require, module, exports) {',
        '})'
    ];

    const wrappedContent = wrapper[0] + content + wrapper[1];

    const script = new vm.Script(wrappedContent, {
        filename: filename
    });

    const module = {
        exports: {}
    };
    
    const result = script.runInThisContext();
    result(r, module, module.exports);
    return module.exports;
}

global.r = r;