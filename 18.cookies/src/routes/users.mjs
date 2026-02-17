import { Router } from "express";
import { getParamsId } from "../utils/middleware.mjs";
import { getUserIndexById } from "../utils/middleware.mjs";
import { users } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { validationResult, matchedData,checkSchema } from "express-validator";

const router = Router();


router.get("/", (req, res) => {
    res.cookie("user","sachit",{maxAge : 60000 * 6 , signed : true})
    res.send({ msg: "Root" });
})

router.get("/api/users", (req, res) => {

    if(req.signedCookies.user && req.signedCookies.user == "sachit" ){

        console.log(req.signedCookies)
        const { filter, value } = req.query;

        if (filter && value) {
            return res.send(
                users.filter((user) =>
                    user[filter] &&
                    user[filter].toLowerCase().includes(value.toLowerCase())
                )
            );
        }

        return res.send(users);

    }else{
        res.send({msg : "your a not a sachit/cookie"});
    }


});

router.get("/api/users/:id", getParamsId, (req, res) => {
    const user = users.find((user) => user.id === req.id);

    if (user) {
        return res.send(user);
    } else {
        return res.status(404).send({ msg: "user not found" });
    }
});

router.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = matchedData(req);
    const newUser = { id: users[users.length - 1].id + 1, ...body };
    users.push(newUser);
    return res.status(201).send(newUser);
});

router.put("/api/users/:id", getUserIndexById, (req, res) => {
    const id = parseInt(req.params.id);
    const { body } = req;
    users[req.userIndex] = { id: id, ...body };
    return res.status(200).send({ msg: "User Updated" });
});

router.patch("/api/users/:id", getUserIndexById, (req, res) => {
    const { body } = req;
    users[req.userIndex] = { ...users[req.userIndex], ...body };
    return res.sendStatus(200);
});

router.delete("/api/users/:id", getUserIndexById, (req, res) => {
    users.splice(req.userIndex, 1);
    return res.sendStatus(200);
});
export default router;