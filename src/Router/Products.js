import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkMiddlewares.js";


const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", checkPermission, create);
router.put("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission, remove);

export default router;