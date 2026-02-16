import { Router } from "express";
import productsRouter from "../routes/products.mjs";
import usersRouter from "../routes/users.mjs";

const router = Router();
router.use(usersRouter);
router.use(productsRouter);

export default router;