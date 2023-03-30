import express from "express";
import dotenv from "dotenv";
import productRouter from "./Router/Products.js";
import authRouter from "./Router/Auth.js";
import mongoose from "mongoose";


dotenv.config();
const app = express();


//đăng kí middleware
app.use(express.json());

app.use(productRouter);
app.use(authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/we17302");

export const viteNodeApp = app;