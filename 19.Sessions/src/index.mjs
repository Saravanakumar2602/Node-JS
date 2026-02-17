import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session"
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cookieParser("jhdsgjs"));
app.use(session({
    secret : "keyboard cat",
    resave : false,
    saveUninitialized : false,
    cookie:{
        maxAge: 60000 * 6,
    }
}))



app.get("/", (req, res) => {
    res.cookie("user","sachit",{maxAge : 60000 * 6 , signed : true})
    res.send({ msg: "Root" });
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err,data)=>{
        if(err){
            console.log(err);
        }else{
            
            console.log(data);

        }
    })
})

app.use(routes);


app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
