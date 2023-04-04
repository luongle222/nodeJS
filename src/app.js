import express from "express";
import dotenv from "dotenv";
import productRouter from "./Router/Products.js";
import authRouter from "./Router/Auth.js";
import mongoose from "mongoose";
import categoryRouter from "./models/category.js";
import cors from "cors"


dotenv.config();
const app = express();


//đăng kí middleware
app.use(express.json());
app.use(cors())

app.use(productRouter);
app.use(categoryRouter);
app.use(authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/we17302");

export const viteNodeApp = app;