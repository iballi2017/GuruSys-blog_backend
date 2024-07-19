"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_Register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const handle_Register = async (_req, res, next) => {
    const { name, email, password } = _req.body;
    try {
        await user_model_1.default.ValidateUser.validateAsync({ email, password });
        const duplicate = await user_model_1.default.User.findOne({ email: email }).exec();
        if (duplicate)
            return res.status(409).json({
                message: 'User already exist!',
                formDAta: email,
            });
        const hashPwd = await bcryptjs_1.default.hash(password, 10);
        const result = await user_model_1.default.User.create({
            name: name,
            email: email,
            password: hashPwd,
        });
        if (result) {
            return res.status(201).json({
                message: `Account created for ${email}`,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.handle_Register = handle_Register;
//# sourceMappingURL=register.handler.js.map