const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

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

app.get('/contact', (req, res) => {
    res.sendFile('./docs/contact.html',{root:__dirname});
});

app.get('/contactss', (req, res) => {
    res.redirect('/contact');
});



app.use((req,res)=>{
    res.sendFile('/docs/404.html',{root:__dirname});
})
