"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (model) => async (req, res, next) => {
    const page = parseInt(req.query.PageNumber) || 1;
    const limit = parseInt(req.query.PageSize) || 10;
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        let count = await model.countDocuments().exec();
        if (endIndex < count) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }
        results.results = await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedResults = results;
        res.count = count;
        next();
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map