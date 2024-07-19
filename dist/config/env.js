"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const assert = require('assert');
dotenv_1.default.config();
const { APP_NAME, PORT, HOST, HOST_URL, CLIENT_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EXPRESS_SESSION_KEY, DATABASE_PASSWORD, DATABASE_USERNAME, } = process.env;
assert(APP_NAME, 'APP_NAME is required');
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
assert(HOST_URL, 'HOST_URL is required');
assert(CLIENT_URL, 'CLIENT_URL is required');
assert(ACCESS_TOKEN_SECRET, 'ACCESS_TOKEN_SECRET is required');
assert(REFRESH_TOKEN_SECRET, 'REFRESH_TOKEN_SECRET is required');
assert(EXPRESS_SESSION_KEY, 'EXPRESS_SESSION_KEY is required');
assert(DATABASE_PASSWORD, 'DATABASE_PASSWORD is required');
assert(DATABASE_USERNAME, 'DATABASE_USERNAME is required');
const env = {
    APP_NAME: APP_NAME,
    PORT: PORT,
    HOST: HOST,
    HOST_URL: HOST_URL,
    CLIENT_URL: CLIENT_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    EXPRESS_SESSION_KEY,
    DATABASE_PASSWORD,
    DATABASE_USERNAME,
};
exports.default = env;
//# sourceMappingURL=env.js.map