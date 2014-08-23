#!/usr/bin/env node
var st = require('st');
var http = require('http');
var o = require('open');
var urlize = require('../urlize.js');
var args = require('nomnom')
    .option('color', {
        position: 0,
        help: 'The color to inspect'
    })
    .option('version', {
        flag: true,
        help: 'Print version and exit',
        callback: function() {
            return require('../package.json').version;
        }
    })
    .parse();

var mount = st({
    path: __dirname + '/..',
    index: 'index.html'
});
var server = http.createServer(function(req, res) {
    mount(req, res);
    if (/\/close$/.test(req.url)) {
        res.end();
        process.exit();
    }
});
server.listen(0, function() {
    var addr = server.address();
    var uri = 'http://' + addr.address + ':' + addr.port;
    var color = args.color;
    if (color) {
        uri += '#' + urlize(color);
    }
    o(uri);
});
