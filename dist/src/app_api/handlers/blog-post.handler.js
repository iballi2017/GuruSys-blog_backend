"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle_DeletePostById = exports.handle_UpdatePostById = exports.handle_GetPostById = exports.handle_GetAllPosts = exports.handle_PostBlog = void 0;
const blog_post_model_1 = __importDefault(require("../models/blog-post.model"));
const handle_PostBlog = async (_req, res, next) => {
    const userId = _req.user_id;
    const data = _req.body;
    try {
        const result = await blog_post_model_1.default.BlogPost.create({
            author: userId,
            title: data.title,
            body: data.body,
            updatedBy: userId,
        });
        res.status(201).json({
            message: 'Post created!',
            result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handle_PostBlog = handle_PostBlog;
const handle_GetAllPosts = async (_req, res, next) => {
    try {
        await blog_post_model_1.default.BlogPost.find();
        res.status(200).json({
            message: 'LIST OF POSTS',
            totalSize: res.count,
            result: res.paginatedResults,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handle_GetAllPosts = handle_GetAllPosts;
const handle_GetPostById = async (_req, res, next) => {
    const postId = _req.params.postId;
    try {
        const result = await blog_post_model_1.default.BlogPost.findOne({ _id: postId });
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handle_GetPostById = handle_GetPostById;
const handle_UpdatePostById = async (_req, res, next) => {
    const userId = _req.user_id;
    const postId = _req.params.postId;
    const data = _req.body;
    try {
        const foundPost = await blog_post_model_1.default.BlogPost.findOne({ _id: postId });
        if (!foundPost)
            return res.sendStatus(404);
        const result = await blog_post_model_1.default.BlogPost.updateOne({ _id: postId }, Object.assign(Object.assign({}, data), { updatedBy: userId, updatedAt: new Date() }));
        if (result && result.acknowledged) {
            return res.status(200).json({
                message: 'POST UPDATED!',
                result,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.handle_UpdatePostById = handle_UpdatePostById;
const handle_DeletePostById = async (_req, res, next) => {
    const postId = _req.params.postId;
    try {
        const foundPost = await blog_post_model_1.default.BlogPost.findOne({ _id: postId });
        if (!foundPost)
            return res.status(404).json({
                message: 'Post not found',
            });
        const result = await blog_post_model_1.default.BlogPost.deleteOne({ _id: postId });
        res.status(200).json({
            message: 'Post deleted!',
            result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.handle_DeletePostById = handle_DeletePostById;
//# sourceMappingURL=blog-post.handler.js.map