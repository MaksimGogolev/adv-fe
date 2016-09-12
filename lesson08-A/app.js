var express = require( 'express' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require('url');
var apiVersion = require('./package').version;
var rmdir = require('rmdir');
var bodyParser = require('body-parser');

var app = express();

app.set('port', 5000);

app.listen(app.get('port'), function() {
    console.log('Node app is running on http://localhost:' + app.get('port') );
});

app.use(bodyParser.json());

app.get('/', function (req, res) {
    var urlParsed = url.parse(req.url, true);

    console.log(urlParsed);

    res.send('<html><body><h1>My web app http API! Version ' + apiVersion + '</h1></body></html>');
});

app.get('/api/' + apiVersion + /users|posts/, function (req, res) {
   renderWithJoinFile(req,res);
});

app.post('/api/' + apiVersion + /users|posts/ , function (req, res) {
   renderAndPost(req,res);
});

app.put('/api/' + apiVersion + /users/ + '([0-9]{3})' , function (req, res) {
   renderAndPost(req,res);
});

app.post('/api/' + apiVersion + /posts/ + '([0-9]{3})' , function (req, res) {
   renderAndPost(req,res);
});

app.delete('/api/' + apiVersion + /users|posts/ + '([0-9]{3})', function (req, res) {
    renderAndDelete(req,res);
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
        if (err) return errRes(res, 404, 'What???');
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
    })
    .catch(function(err){
        console.log(err);
        errRes(res, 404, 'WTF?');
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

function renderAndPost(req, res) {
    var rootDirName = req.path.replace('/' + apiVersion + '/', '/');
    var rootDirPath = path.join(__dirname,rootDirName);
    var idName = path.basename(rootDirName);

    var helperID = {
        posts: 'postId',
        users: 'id'
    };

    var p1 = new Promise(function (resolve,reject) {
        var json = req.body[0];
        var dirName = helperID[idName]&&json[helperID[idName]];
        if(!dirName) reject({code: 'id not found'});
        resolve(dirName);
    });

    p1.then(function (dirName) {
        return new Promise(function (resolve, reject) {
            fs.mkdir(rootDirPath+dirName, function (err) {
                if (err) return reject(err);
                resolve(rootDirPath+dirName);
            });
        });
    })
    .then(function (dirPath) {
        fs.createWriteStream(dirPath+'/get.json')
            .write(JSON.stringify(req.body, null, ' '), function (err){
                if(err) return reject(err);
                return successRes(res);
            });
    })
    .catch(function (err) {
        errRes(res, 409, err.code);
        console.log(err);
    })
}

function renderAndDelete(req, res) {
    var DirName = req.path.replace('/' + apiVersion + '/', '/');
    var DirPath = path.join(__dirname,DirName);

    var p1 = new Promise(function (resolve,reject) {
        rmdir(DirPath,function (err) {
            if(err) return reject(err);
            return successRes(res)
        });
    });

    p1.catch(function (err) {
        errRes(res, 404, err.code);
        console.log(err);
    })
}

function errRes(res,status,code) {
    return res
        .status(status)
        .json([
            {
                "info": {
                    "success": false,
                    "code": code
                }
            }
        ])
        .end();
}

function successRes(res) {
    return res
        .status(200)
        .json([
            {
                "info": {
                    "success": true
                }
            }
        ])
        .end();
}