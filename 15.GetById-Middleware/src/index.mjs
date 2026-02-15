import express from "express";

const app = express();

const PORT = 3000;

const users = [
    { id: 1, user_name: "srvn" },
    { id: 2, user_name: "vaish" },
    { id: 3, user_name: "Saravana" },
    { id: 4, user_name: "kumar" },
];

const products = [
    { id: 1, product_name: "iphone 17" },
    { id: 2, product_name: "iphone 18" },
    { id: 3, product_name: "s22 ultra" },
    { id: 4, product_name: "s22 plus" },
];

const getUserIndexById = (req,res,next)=>{

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const userIndex = products.findIndex((user) => user.id === id);

    if (userIndex===-1) {

        return res.status(404).send({ msg: "user not found" });
    }

    req.userIndex = userIndex;
    next();
}

const getParamsId = (req,res,next)=>{
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }
    req.id = id;
    next();

}

app.get("/", (req, res) => {
    res.send({ msg: "Root" });
});

app.get("/api/users", (req, res) => {
    const { query: { filter, value } } = req;
    console.log(filter, value);

    if (filter && value) {
        return res.send(
            users.filter((user) =>
                user[filter] &&
                user[filter].toLowerCase().includes(value.toLowerCase())
            )
        );
    }

    return res.send(users); 
});

app.get("/api/users/:id", getParamsId,(req, res) => {

    const id = req.id;
    const user = users.find((user) => user.id === id);

    if (user) {
        return res.send(user);
    } else {
        return res.status(404).send({ msg: "user not found" });
    }
});

app.get("/api/products/:id",getParamsId, (req, res) => {
    const id = req.id;

    const product = products.find((product) => product.id === id);

    if (product) {
        return res.send(product);
    } else {
        return res.status(404).send({ msg: "product not found" });
    }
});

app.get("/api/products", (req, res) => {
    const { query: { filter, value } } = req;
    console.log(filter, value);

    if (filter && value) {
        return res.send(
            products.filter((product) =>
                product[filter] &&
                product[filter].toLowerCase().includes(value.toLowerCase())
            )
        );
    }

    return res.send(products); 
});

app.use(express.json());

app.post("/api/users",(req,res)=>{
    console.log(req.body); 
    const {body} = req;
    const newUser = {id:users[users.length-1].id+1,...body};
    users.push(newUser);
    return res.status(201).send(newUser);
})

app.post("/api/products",(req,res)=>{
    console.log(req.body); 
    const {body} = req;
    const newUser = {id:products[products.length-1].id+1,...body};
    products.push(newUser);
    return res.status(201).send(newUser);
})

app.put("/api/users/:id",getUserIndexById,(req,res)=>{

    const userIndex = req.userIndex;
    const {body} = req;
    users[userIndex] = {id:id,...body};
    return res.status(200).send({msg:"User Updated"});
})

app.put("/api/products/:id",(req,res)=>{
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const userIndex = products.findIndex((user) => user.id === id);

    if (userIndex===-1) {

        return res.status(404).send({ msg: "user not found" });
    }

    const {body} = req;
    products[userIndex] = {id:id,...body};
    return res.status(200).send({msg:"User Updated"});
})

app.patch("/api/users/:id",getUserIndexById,(req,res)=>{
    
    const userIndex = req.userIndex;
    const {body} = req;
    users[userIndex] = {...users[userIndex],...body};
    return res.sendStatus(200);

})

app.patch("/api/products/:id",(req,res)=>{

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const userIndex = products.findIndex((user) => user.id === id);

    if (userIndex===-1) {

        return res.status(404).send({ msg: "user not found" });
    }

    const {body} = req;
    products[userIndex] = {...products[userIndex],...body};
    return res.sendStatus(200);

})

app.delete("/api/users/:id",getUserIndexById , (req,res)=>{
    const userIndex = req.userIndex;
    users.splice(userIndex,1);
    res.sendStatus(200);
});

app.delete("/api/products/:id",(req,res)=>{

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const userIndex = products.findIndex((user) => user.id === id);

    if (userIndex===-1) {

        return res.status(404).send({ msg: "user not found" });
    }

    products.splice(userIndex,1);
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});


