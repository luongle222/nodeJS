import dotenv from "dotenv";
import axios from "axios";
import joi from "joi";
import products from "../models/Products.js";

dotenv.config();

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
});

export const getAll = async (req, res) => {
    try {
        const product = await products.find();
        if (products.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json({
            message: "Lấy danh sách sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const product = await products.findById(req.params.id);
        if (!product) {
            return res.json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.json({
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
        // validate
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        // const { data: product } = await axios.post(`${process.env.API_URL}/products`, req.body);
        const product = await products.post(req.body);
        if (!product) {
            return res.json({
                message: "Thêm sản phẩm không thành công",
            });
        }
        return res.json({
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
        const product = await products.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
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
        const product = await products.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};