import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cookieParser("jhdsgjs"));
app.use(routes);



app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
