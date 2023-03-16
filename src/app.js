import express from "express";
import dotenv from "dotenv";
import productRouter from "./Router/Products.js";
import authRouter from "./Router/Auth.js";

dotenv.config();
const app = express();

//đăng kí middleware
app.use(express.json());

app.use(productRouter);

app.use(authRouter);


export const viteNodeApp = app;