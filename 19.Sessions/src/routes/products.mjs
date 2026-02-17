import { Router } from "express";
import { getParamsId } from "../utils/middleware.mjs";
import { getUserIndexById } from "../utils/middleware.mjs";
import { products } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { validationResult, matchedData,checkSchema } from "express-validator";

const router = Router();



router.get("/api/products/:id", getParamsId, (req, res) => {

    

    const product = products.find((product) => product.id === req.id);

    if (product) {
        return res.send(product);
    } else {
        return res.status(404).send({ msg: "product not found" });
    }
});

router.get("/api/products", (req, res) => {

    req.session.visited = true;
    console.log(req.session.id)
    const { filter, value } = req.query;

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


router.post("/api/products", (req, res) => {
    const { body } = req;
    const newProduct = { id: products[products.length - 1].id + 1, ...body };
    products.push(newProduct);
    return res.status(201).send(newProduct);
});



router.put("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).send({ msg: "product not found" });
    }

    const { body } = req;
    products[productIndex] = { id: id, ...body };
    return res.status(200).send({ msg: "Product Updated" });
});



router.patch("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).send({ msg: "product not found" });
    }

    const { body } = req;
    products[productIndex] = { ...products[productIndex], ...body };
    return res.sendStatus(200);
});



router.delete("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({ msg: "Bad Request, Invalid ID" });
    }

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).send({ msg: "product not found" });
    }

    products.splice(productIndex, 1);
    return res.sendStatus(200);
});


export default router;