const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("Request Made");
    // console.log(req);
    console.log(req.url);
    console.log(req.method);

    // res.setHeader('Content-Type','text/plain');
    // res.write("Hello Everyone I am Saravanakumar");
    // res.end();

    res.setHeader('Content-Type','text/html');
    res.write("<h1>Hello Everyone I am Saravanakumar</h1>");
    res.write("<h4>Gamer | Dev | Explorer</h4>");
    res.end();
})

server.listen("3000","localhost",()=>{
    console.log("server is listening");

})
