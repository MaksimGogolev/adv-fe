var express = require('express');
var app = express();
var path = require('path');
var jsonServer = require('json-server');

// for example, we can use jsonServer for mocking
app.use('/json-server', jsonServer.router('api/mocks/db.json'));

app.use('/', express.static(path.join(__dirname, 'client_build')));

app.listen(3000, function() {
    console.log("server started");
});
