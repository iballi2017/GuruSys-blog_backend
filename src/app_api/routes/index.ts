import express from 'express';
import { handle_DeletePostById, handle_GetAllPosts, handle_PostBlog, handle_UpdatePostById } from '../handlers/blog.handler';
import { handle_Register } from '../handlers/register.handler';
import { handle_Login } from '../handlers/auth.handler';
import { handle_Logout } from '../handlers/logout.handler';
import { handle_refreshToken } from '../handlers/refresh-token.handler';
import { handle_DeleteCategoryCategoryId, handle_GetCategoryList, handle_PostCategory } from '../handlers/category.handler';
// import logger from '../utils/logger';
// import {healthCheck} from '../handlers/healthCheck'

const router = express.Router();

/**Auth user routes */
router.route('/auth/register').post(handle_Register);
router.route('/auth/login').post(handle_Login);
router.route('/auth/logout').get(handle_Logout);
router.route('/auth/refresh-token').get(handle_refreshToken);

/* POST Blogpost. */
// router.post('/', handle_PostBlog);
router.route('/').post(handle_PostBlog).get(handle_GetAllPosts);
router.route('/:postId').put(handle_UpdatePostById).delete(handle_DeletePostById);

/**Blog Category routes */
router.route('/post-category').post(handle_PostCategory).get(handle_GetCategoryList);
router.route('/post-category/:categoryId').delete(handle_DeleteCategoryCategoryId);

/* GET Blogpost. */
// router.get('/', handle_PostBlog);

export default router;
