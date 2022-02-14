const fs = require('fs');
const path = require('path');
const express = require('express');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();

class Component extends React.Component {
    render() {
        const id = this.props.id;
        return React.createElement('div', null, `hello ${id}`);
    }
}

app.get('/:id', function (req, res) {
    const {id} = req.params;
    const content = ReactDOMServer.renderToString(React.createElement(Component, {id}));
    res.send(content);
});

app.listen(8888, () => {
    console.log('server started');
});
