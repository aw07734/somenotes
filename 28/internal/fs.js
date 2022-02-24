const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, './text');

// error first
// fs.readFile(pathToFile, 'utf-8', function(err, data) {
//     if (err) {
//         console.log('error:', err);
//         return err;
//     }
//     console.log('result', data);
// });

// const content = fs.readFileSync(pathToFile, 'utf-8');
// console.log('sync content', content);

function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push(function(err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
            return func.apply(func, args);
        });
    };
}

const readFileAsync = promisify(fs.readFile);
readFileAsync(pathToFile, 'utf-8')
    .then(data => console.log(data))
    .catch(err => console.log('err', 'err', err));