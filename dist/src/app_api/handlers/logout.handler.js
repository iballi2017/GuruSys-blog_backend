"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_Logout = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const handle_Logout = async (_req, res, next) => {
    const cookies = _req.cookies;
    if (!cookies && !cookies.jwt)
        return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await user_model_1.default.User.findOne({ refreshToken });
        if (!foundUser)
            return res.clearCookie('jwt', refreshToken), res.status(200).json({ message: 'Logout successful!!!' });
        foundUser.refreshToken = '';
        await foundUser.save();
        res.clearCookie('jwt', refreshToken);
        res.status(200).json({
            message: 'Logout successful!!!',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handle_Logout = handle_Logout;
//# sourceMappingURL=logout.handler.js.map