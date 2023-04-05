import express from "express";
import dotenv from "dotenv";
import productRouter from "./Router/Products.js";
import authRouter from "./Router/Auth.js";
import mongoose from "mongoose";
import categoryRouter from "./models/category.js";
import cors from "cors"


dotenv.config();
const app = express();


// đăng ký middleware" giải mã dữ liệu json
app.use(express.json());
app.use(cors());
// router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/we17302");

export const viteNodeApp = app;