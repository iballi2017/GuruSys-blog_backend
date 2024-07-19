"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowed_origins_1 = __importDefault(require("./allowed-origins"));
const corsOptions = {
    origin: (origin, callback) => {
        if (allowed_origins_1.default.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
exports.default = corsOptions;
//# sourceMappingURL=cors-options.js.map