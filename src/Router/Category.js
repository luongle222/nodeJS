import express from "express";

import { get, create } from "../Controllers/category"

const router = express.Router();
router.get("/categories/:id", get);
router.post("/categories", create);

export default router;