// client -> request -> server (middleware) -> response ->client

const express = require('express');
const app = express();
const morgan = require('morgan');

app.listen(3000, () => {   
    console.log("Server running on port 3000");
});

// app.use((req,res,next)=>{
//     console.log("Middleware 1");
//     next();
// })

app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.send("I am Saravanakumar G");
    // res.status(200).send("<h1>Hi I am Saravanakumar</h1>");
    res.sendFile('./docs/index.html',{root:__dirname});
});

app.get('/home', (req, res) => {
    res.sendFile('./docs/index.html',{root:__dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./docs/about.html',{root:__dirname});
});

app.use((req,res,next)=>{
    console.log("Middleware 2");
    next();
})

app.get('/contact', (req, res) => {
    res.sendFile('./docs/contact.html',{root:__dirname});
});

app.get('/contactss', (req, res) => {
    res.redirect('/contact');
});



app.use((req,res)=>{
    res.status(404).sendFile('/docs/404.html',{root:__dirname});
})
