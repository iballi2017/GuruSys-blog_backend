"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_post_handler_1 = require("../handlers/blog-post.handler");
const register_handler_1 = require("../handlers/register.handler");
const auth_handler_1 = require("../handlers/auth.handler");
const logout_handler_1 = require("../handlers/logout.handler");
const refresh_token_handler_1 = require("../handlers/refresh-token.handler");
const verifyEditorRefeshJWT_1 = require("../../middlewares/verifyEditorRefeshJWT");
const pagination_1 = require("../../helpers/pagination");
const blog_post_model_1 = __importDefault(require("../models/blog-post.model"));
const verifyJWT_1 = require("../../middlewares/verifyJWT");
const router = express_1.default.Router();
router.route('/auth/register').post(register_handler_1.handle_Register);
router.route('/auth/login').post(auth_handler_1.handle_Login);
router.route('/auth/logout').get(logout_handler_1.handle_Logout);
router.route('/auth/refresh-token').get(refresh_token_handler_1.handle_refreshToken);
router
    .route('/blog-post')
    .post(verifyJWT_1.verifyJWT, verifyEditorRefeshJWT_1.verifyEditorRefeshJWT, blog_post_handler_1.handle_PostBlog)
    .get(verifyJWT_1.verifyJWT, (0, pagination_1.paginate)(blog_post_model_1.default.BlogPost), blog_post_handler_1.handle_GetAllPosts);
router
    .route('/blog-post/:postId')
    .get(blog_post_handler_1.handle_GetPostById)
    .put(verifyJWT_1.verifyJWT, verifyEditorRefeshJWT_1.verifyEditorRefeshJWT, blog_post_handler_1.handle_UpdatePostById)
    .delete(verifyJWT_1.verifyJWT, verifyEditorRefeshJWT_1.verifyEditorRefeshJWT, blog_post_handler_1.handle_DeletePostById);
exports.default = router;
//# sourceMappingURL=index.js.map