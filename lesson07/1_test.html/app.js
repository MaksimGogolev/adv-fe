var express = require('express');
var jsonServer = require('json-server');
var fs = require('fs');
var path = require('path');

var app = express();

var CLIENT_PATH = '/client_build';

app.get('/test',function (req, res) {
    res.sendFile(path.join(__dirname, CLIENT_PATH, '/test.html'));
});

// for example, we can use jsonServer for mocking
app.use('/json-server', jsonServer.router('api/mocks/db.json'));

app.use('/', express.static(path.join(__dirname, CLIENT_PATH, '/')));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening ' + host + ':' +  port);
});
