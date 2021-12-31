const express = require('express');
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer();
const { createApp } = require('./index');

const app = express();

app.use('/dist', express.static(path.join(__dirname, './dist')));

app.get('/build.js', function(req, res) {
    const pathUrl = path.resolve(process.cwd(), './dist/build.js');
    console.log(pathUrl);
    res.sendFile(pathUrl);
});

app.get('*', function (req, res) {
    const url = req.url;
    const { vm, router,store } = createApp();
    router.push(url);
    const matchedComponent = router.getMatchedComponents();
    if (!matchedComponent) {
        //404
    } else {
        console.log(store);
        renderer.renderToString(vm, function (err, html) {
            res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        ${html}
    </div>
    <script>window.store = ${JSON.stringify(store.state)};</script>
    <script src="/build.js"></script>
</body>
</html>
            `);
        });
    }
});

app.listen(8888);