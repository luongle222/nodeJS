import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkMiddlewares.js";


const router = express.Router();
router.get("/api/products", getAll);
router.get("/api/products/:id", get);
router.post("/api/products", checkPermission, create);
router.put("/api/products/:id", checkPermission, update);
router.delete("/api/products/:id", checkPermission, remove);

export default router;