var express = require( 'express' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require('url');
var apiVersion = require('./package').version;
var bodyParser = require('body-parser');
var promisify = require('./promisify');
var readdir = promisify(fs.readdir);
var readFile = promisify(fs.readFile);
var mkdir = promisify(fs.mkdir);
var writeFile = promisify(fs.writeFile);
var rmdir = promisify(require('rmdir'));

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

    readdir(rootDirPath)
        .then(function (filesAndDirs) {
            return Promise.resolve(filesAndDirs
                .filter(function (dirName) {
                    return /\d+/.test(dirName);
                })
            );
        })
        .then(function (dirsName) {
            return Promise.all(
                dirsName.map(function (dirName) {
                    var filePath = rootDirPath + dirName + '/get.json';
                    return readFile(filePath)
                        .catch(function () {return "[]";});
                })
            );
        })
        .then(function (filesData) {
            res.setHeader('content-type', 'application/json');
            var json = filesData.reduce(function (arr, item) {
                return arr.concat(JSON.parse(item))
            },[]);
            res.send(JSON.stringify(json,null,'  '));
        })
        .catch(function(err){
            console.log(err);
            errRes(res, 404, 'WTF?');
        });
}

function renderAndPost(req, res) {
    var rootDirName = req.path.replace('/' + apiVersion + '/', '/');
    var rootDirPath = path.join(__dirname,rootDirName);
    var idName = path.basename(rootDirName);

    var helperID = {
        posts: 'postId',
        users: 'id'
    };

    var json = req.body[0];
    var dirName = helperID[idName] && json[helperID[idName]];
    var dirPath = rootDirPath+dirName;

    var promiseChain = new Promise(function (resolve,reject) {
        if(!dirName) reject({code: 'id not found'});
        resolve(dirName);
    });

    promiseChain
        .then(function () {
            return mkdir(dirPath);
        })
        .then(function () {
            return writeFile(dirPath+'/get.json',
                JSON.stringify(req.body, null, ' '));
        })
        .then(function () {
            return successRes(res);
        })
        .catch(function (err) {
            errRes(res, 409, err.code);
            console.log(err);
        })
}

function renderAndDelete(req, res) {
    var DirName = req.path.replace('/' + apiVersion + '/', '/');
    var DirPath = path.join(__dirname,DirName);

    rmdir(DirPath)
        .then(function () {
            return successRes(res)
        })
        .catch(function (err) {
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