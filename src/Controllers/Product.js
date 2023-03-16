import dotenv from "dotenv";
import axios from "axios";
import joi from "joi";
import Products from "../models/Products.js";
dotenv.config();

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required()
})

export const getAll = async (req, res) => {
    try {
        // const { data: products } = await axios.get(`${process.env.API_URL}/products`);
        const products = await Products.find();
        console.log(products);
        if (products.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json({
            message: "Lấy danh sách sản phẩm thành công",
            products,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        // const { data: product } = await axios.get(
        //     `${process.env.API_URL}/products/${req.params.id}`
        // );
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        res.json({
            message: "Lấy sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        // const { data: product } = await axios.post(`${process.env.API_URL}/products`, req.body);
        const product = await Products.create(req.body);
        if (!product) {
            return res.json({
                message: "Thêm sản phẩm không thành công",
            });
        }
        res.json({
            message: "Thêm sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const update = async (req, res) => {
    try {
        const { data: product } = await axios.put(
            `${process.env.API_URL}/products/${req.params.id}`,
            req.body
        );
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const { data: product } = await axios.delete(
            `${process.env.API_URL}/products/${req.params.id}`
        );
        // if (!product) {
        //     return res.json({
        //         message: "Xóa sản phẩm không thành công",
        //     });
        // }
        res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};