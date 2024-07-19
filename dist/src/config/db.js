"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = __importDefault(require("./env"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const MONGO_URI = `mongodb+srv://${env_1.default.DATABASE_USERNAME}:${env_1.default.DATABASE_PASSWORD}@cluster0.flcgahs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose_1.default
    .connect(MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
//# sourceMappingURL=db.js.map