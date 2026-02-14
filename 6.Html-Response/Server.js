const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');
    let path = './docs/';

    if (req.url === '/') {
        path += 'index.html';
    } else if(req.url === '/home'){
        res.statusCode = 301;
        res.setHeader('Location','/')
        res.end();
    }
    else if (req.url === '/about') {
        path += 'about.html';
    } 
    else if (req.url === '/contact') {
        path += 'contact.html';
    } 
    else {
        path += '404.html';
        res.statusCode = 404;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end('<h1>Internal Server Error</h1>');
        } else {
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log("server is listening");
});
