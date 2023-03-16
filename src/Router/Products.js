import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product.js";

const router = express.Router();
router.get("/api/products", getAll);
router.get("/api/products/:id", get);
router.post("/api/products", create);
router.put("/api/products/:id", update);
router.delete("/api/products/:id", remove);

export default router;