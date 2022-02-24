const http = require('http');

const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'x-zhuawa': 'hello-zhuawa' });
    res.end('hello world');
});

proxy.listen(8888, '192.168.9.201', () => {
    console.log('server start!');
});