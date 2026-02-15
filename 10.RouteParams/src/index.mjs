import express from "express";

const app = express();

const PORT =  3000;

const users = [
    {id:1,user_name:"srvn"},
    {id:2,user_name:"vaish"},
    {id:3,user_name:"Saravana"},
    {id:4,user_name:"kumar"},
]

app.get("/",(req,res)=>{
    res.send({msg : "Root"});
})

app.get("/api/users",(req,res)=>{
    res.send(users);
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

app.listen(PORT,()=>{
    console.log(`App is running on Port ${PORT}`)
})

