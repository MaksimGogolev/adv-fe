var express = require( 'express' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require('url');
var apiVersion = require('./package').version;

var app = express();

app.set('port', 5000);

app.listen(app.get('port'), function() {
    console.log('Node app is running on http://localhost:' + app.get('port') );
});

app.get('/', function (req, res) {
    var urlParsed = url.parse(req.url, true);

    console.log(urlParsed);

    res.send('<html><body><h1>My web app http API! Version ' + apiVersion + '</h1></body></html>');
});

app.get('/api/' + apiVersion + /users|posts/, function (req, res) {
   renderWithJoinFile(req,res)
});

app.all('/test/', function (req, res) {
    res.send('<html><body><h1>Hello test</h1></body></html>');
});

app.all('/api/' + apiVersion + /\w+/ + '*', function (req, res) {
    render(req, res);
});

function render(req, res) {
    var fileName = req.path + '/' + req.method.toLowerCase() + '.json';
    fileName = fileName.replace('/' + apiVersion + '/', '/');
    var filePath = path.join(__dirname, fileName);

    fs.stat(filePath, function (err) {
        res.setHeader('content-type', 'application/json');
        if (err) return errRes(res);
        fs.createReadStream(filePath).pipe(res);
    });
}

function renderWithJoinFile(req, res) {
    var rootDirName = req.path.replace('/' + apiVersion + '/', '/');
    var rootDirPath = path.join(__dirname,rootDirName);

    var dirsName = new Promise (function (resolve) {
        fs.readdir(rootDirPath, function (err, filesAndDirs) {
            resolve(filesAndDirs.filter(function (dirName) {
                return /\d+/.test(dirName);
            }));
        });
    });

    dirsName.then(function (dirsName) {
        return getFilesDataFromDirsName(dirsName);
    })
    .then(function(filesData){
        res.setHeader('content-type', 'application/json');
        var json = JSON.stringify(filesData.reduce(function (arr, item) {
            return arr.concat(item);
        }), null, '  ');
        res.send(json);
    });

    function getFilesDataFromDirsName(dirsName){
        return Promise.all(
            dirsName.map(function (dirName) {
                var filePath = rootDirPath + dirName + '/get.json';
                return new Promise(function (resolve) {
                    fs.readFile(filePath, function (err,data) {
                        if (err) return;
                        resolve(JSON.parse(data));
                    });
                });
            })
        )
    }
}

function errRes(res) {
    return res
        .status(404)
        .json([
            {
                "info": {
                    "success": false,
                    "code": 12345
                }
            }
        ])
        .end();
}

    // Lesson example
    // if (fs.statSync(filePath)) {
    //
    //     res.setHeader('content-type', 'application/json');
    //
    //     fs.createReadStream(filePath).pipe(res);
    // }
    // else {
    //     console.log('no such file', filePath);
    //
    //     res
    //         .status(404)
    //         .json([
    //             {
    //                 "info": {
    //                     "success": false,
    //                     "code": 12345
    //                 }
    //             }
    //         ])
    //         .end();
    // }

//
//app.get('/api/1.0/users', function (req, res) {
//    res.send(users);
//});
//
//app.get('/api/1.0/users/:userId', function (req, res) {
//
//    console.log(req.query);
//
//    res.send(user);
//});


