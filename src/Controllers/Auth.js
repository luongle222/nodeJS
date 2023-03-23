
import bcrypt from "bcryptjs";

import User from "../models/Auth.js"
import { signupSchema } from "../Schema/Auth.js";




export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }


        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(404).json({
                message: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        user.password = undefined;

        return res.status(201).json({
            message: "Đăng kí thành công",
            user,
        })
    } catch (error) {
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