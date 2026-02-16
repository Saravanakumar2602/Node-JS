import express from "express";
import routes from "./routes/router.mjs";
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
