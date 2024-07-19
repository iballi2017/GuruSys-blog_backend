"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const error_handler_1 = require("./middlewares/error-handler");
const httpLogger_1 = __importDefault(require("./middlewares/httpLogger"));
const index_1 = __importDefault(require("./routes/index"));
const index_2 = __importDefault(require("./app_api/routes/index"));
const env_1 = __importDefault(require("./config/env"));
const cors_options_1 = __importDefault(require("./config/cors-options"));
Promise.resolve().then(() => __importStar(require("./config/db")));
const app = (0, express_1.default)();
const port = env_1.default.PORT || '8000';
app.set('port', port);
const server = http_1.default.createServer(app);
app.use(httpLogger_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(cors_options_1.default));
app.use('/', index_1.default);
app.use('/api', index_2.default);
app.use((_req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
app.use(error_handler_1.handleError);
function onError(error) {
    console.log("error$$$ ", error);
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    console.info(`Server is listening on ${bind}`);
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
exports.default = app;
//# sourceMappingURL=index.js.map