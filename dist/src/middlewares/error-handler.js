"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const winston = require('winston');
const handleError = (err, _req, res, next) => {
    console.log('Error***: ', err.message);
    winston.error(err.message, err);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Something went wrong',
        },
    });
    next();
};
exports.handleError = handleError;
//# sourceMappingURL=error-handler.js.map