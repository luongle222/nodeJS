import dotenv from "dotenv";
import joi from "joi";
import category from "../models/category";
import Products from "../models/Products";

dotenv.config();

const categorySchema = joi.object({
    name: joi.string().required(),
})

export const getAll = async (req, res) => {
    try {
        const categories = await category.find({});
        if (!categories) {
            return res.json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.json({
            message: "Lấy sản phẩm thành công",
            categories,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate("products");
        if (!product) {
            return res.json({
                message: "không tìm thấy sản phẩm",
            });
        }
        return res.json({
            message: "lấy sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};

export const create = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            })
        }
        const category = await category.create(req.body);
        if (!category) {
            return res.json({
                message: "Thêm danh mục không thành công",
            });
        }
        return res.json({
            message: "Thêm danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}