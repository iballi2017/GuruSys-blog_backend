"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const env_1 = __importDefault(require("../../config/env"));
const handle_refreshToken = async (_req, res, next) => {
    const cookies = _req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await user_model_1.default.User.findOne({ refreshToken });
        if (!foundUser)
            return res.sendStatus(403);
        const envRefreshToken = env_1.default.REFRESH_TOKEN_SECRET ? env_1.default.REFRESH_TOKEN_SECRET : env_1.default.REFRESH_TOKEN_SECRET;
        const envAccessToken = env_1.default.ACCESS_TOKEN_SECRET ? env_1.default.ACCESS_TOKEN_SECRET : env_1.default.ACCESS_TOKEN_SECRET;
        jsonwebtoken_1.default.verify(refreshToken, envRefreshToken, (err, decoded) => {
            if (err || foundUser.email != decoded.email)
                return res.sendStatus(403);
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = jsonwebtoken_1.default.sign({
                userInfo: {
                    name: foundUser.name,
                    email: foundUser.email,
                    user_id: foundUser._id,
                    roles: roles,
                },
            }, envAccessToken, { expiresIn: '1d' });
            return res.json({ roles, accessToken });
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handle_refreshToken = handle_refreshToken;
//# sourceMappingURL=refresh-token.handler.js.map