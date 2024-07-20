"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ConfigPassword {
    constructor(password, userPassword) {
        this.password = password;
        this.userPassword = userPassword;
    }
    match() {
        const match = bcryptjs_1.default.compare(this.password, this.userPassword);
        return match;
    }
}
exports.ConfigPassword = ConfigPassword;
//# sourceMappingURL=config-password.js.map