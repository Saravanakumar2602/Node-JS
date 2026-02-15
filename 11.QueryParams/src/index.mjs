import express from "express";

const app = express();

const PORT =  3000;

const users = [
    {id:1,user_name:"srvn"},
    {id:2,user_name:"vaish"},
    {id:3,user_name:"Saravana"},
    {id:4,user_name:"kumar"},
]

const products = [
    {id:1,product_name:"iphone 17"},
    {id:2,product_name:"iphone 18"},
    {id:3,product_name:"s22 ultra"},
    {id:4,product_name:"s22 plus"},
]

app.get("/",(req,res)=>{
    res.send({msg : "Root"});
})

app.get("/api/users",(req,res)=>{
    
    const {query:{filter,value}} = req;
    console.log(filter,value);
    if(filter&&value){
        res.send(users.filter(((user)=>user[filter].toLowerCase().includes(value))))
    }
    
    //res.send(users);
})

app.get("/api/users/:id",(req,res)=>{
    
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).send({msg:"Bad Request, Invalid ID"});
    }
    const user = users.find((user)=>user.id === id);
    if(user){
        return res.send(user);
    }else{
        res.status(404).send({msg : "user not found"});
    }
})

app.get("/api/products/:id",(req,res)=>{
    
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).send({msg:"Bad Request, Invalid ID"});
    }
    const product = products.find((product)=>product.id === id);
    if(product){
        return res.send(product);
    }else{
        res.status(404).send({msg : "user not found"});
    }
})


app.get("/api/products",(req,res)=>{
    
    const {query:{filter,value}} = req;
    console.log(filter,value);
    if(filter&&value){
        res.send(products.filter(((product)=>product[filter].toLowerCase().includes(value))))
    }
    
    //res.send(users);
})

app.listen(PORT,()=>{
    console.log(`App is running on Port ${PORT}`)
})

