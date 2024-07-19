"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../app_api/models/user.model"));
const env_1 = __importDefault(require("../config/env"));
const verifyRefreshJWT = async (_req, res, next) => {
    const envRefreshToken = env_1.default.REFRESH_TOKEN_SECRET ? env_1.default.REFRESH_TOKEN_SECRET : env_1.default.REFRESH_TOKEN_SECRET;
    const cookies = _req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401).json({
            message: 'Auth failed!',
        });
    const refreshToken = cookies.jwt;
    const foundUser = await user_model_1.default.User.findOne({ refreshToken });
    if (!foundUser)
        return res.sendStatus(404);
    jsonwebtoken_1.default.verify(refreshToken, envRefreshToken, (err, decoded) => {
        if (err || foundUser.email != decoded.email) {
            console.log('====>: ', err.name === 'TokenExpiredError');
            return res.sendStatus(403);
        }
        _req.email = foundUser.email;
        _req.user_id = foundUser._id ? foundUser._id.toString() : '';
    });
    next();
};
exports.verifyRefreshJWT = verifyRefreshJWT;
//# sourceMappingURL=verifyRefreshJWT.js.map