
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


import User from "../models/Auth.js"
import { signupSchema, signinSchema } from "../Schema/Auth.js";

import dotenv from "dotenv"
dotenv.config();



export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = signupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors.message,
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
            accessToken: token,
            user,
        })
    } catch (error) {
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }
        // nó vừa mã hóa và vừa so sánh
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Sai mật khẩu",
            });
        }

        user.password = undefined;
        // tạo token từ server
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

        return res.status(201).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) {
    }
};