"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_Login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_password_1 = require("../../helpers/config-password");
const env_1 = __importDefault(require("../../config/env"));
const handle_Login = async (_req, res, next) => {
    const data = _req.body;
    const { email, password } = data;
    const envRefreshToken = env_1.default.REFRESH_TOKEN_SECRET ? env_1.default.REFRESH_TOKEN_SECRET : env_1.default.REFRESH_TOKEN_SECRET;
    const envAccessToken = env_1.default.ACCESS_TOKEN_SECRET ? env_1.default.ACCESS_TOKEN_SECRET : env_1.default.ACCESS_TOKEN_SECRET;
    try {
        await user_model_1.default.ValidateUser.validateAsync({ email, password });
        const foundUser = await user_model_1.default.User.findOne({ email: email });
        if (!foundUser)
            return res.status(401).json({
                message: 'Auth failed',
                formData: email,
            });
        const config_password = new config_password_1.ConfigPassword(password, foundUser.password);
        const match = await config_password.match();
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);
            let accessToken = '';
            if (!data.rememberMe) {
                accessToken = jsonwebtoken_1.default.sign({
                    userInfo: {
                        name: foundUser.name,
                        email: foundUser.email,
                        user_id: foundUser._id,
                        roles: roles,
                    },
                }, env_1.default.ACCESS_TOKEN_SECRET ? env_1.default.ACCESS_TOKEN_SECRET : '', { expiresIn: 15 });
            }
            else {
                accessToken = jsonwebtoken_1.default.sign({
                    userInfo: {
                        name: foundUser.name,
                        email: foundUser.email,
                        user_id: foundUser._id,
                        roles: roles,
                    },
                }, envAccessToken, { expiresIn: '7d' });
            }
            let refreshToken = jsonwebtoken_1.default.sign({ email: foundUser.email }, envRefreshToken, { expiresIn: '1d' });
            foundUser.refreshToken = refreshToken;
            await foundUser.save();
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ roles, accessToken });
            return;
        }
    }
    catch (error) {
        next(error);
    }
};
exports.handle_Login = handle_Login;
//# sourceMappingURL=auth.handler.js.map