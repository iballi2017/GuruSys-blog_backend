"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const verifyJWT = async (_req, res, next) => {
    const envAccessToken = env_1.default.ACCESS_TOKEN_SECRET ? env_1.default.ACCESS_TOKEN_SECRET : env_1.default.ACCESS_TOKEN_SECRET;
    const authHeader = _req.headers.authorization || _req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, envAccessToken, (err, decoded) => {
        if (err)
            return res.sendStatus(401);
        _req.email = decoded.email;
        _req.roles = decoded.roles;
        _req.user_id = decoded._id ? decoded._id.toString() : '';
        next();
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map