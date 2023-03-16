import dotnev from "dotenv";
import axios from "axios";
import joi from "joi";

dotnev.config();

const authSchema = joi.object({
    email: joi.email().required(),
    password: joi.string().required()
});

export const signup = async (req, res) => {
    try {
        const { error } = authSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { data: user } = await axios.post(`${process.env.API_URL}/signup`, req.body);
        if (!user) {
            return res.json({
                message: "Tạo tài khoản không thành công",
            });
        }
        res.json({
            message: "Tạo tài khoản thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { data: user } = await axios.get(
            `${process.env.API_URL}/signin/${req.params.id}`
        );
        if (!user) {
            return res.json({
                message: "Tài khoản bạn nhập không đúng",
            });
        }
        res.json({
            message: "Đăng nhập thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};