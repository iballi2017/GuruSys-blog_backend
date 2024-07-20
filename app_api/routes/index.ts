import express from 'express';
import { handle_DeletePostById, handle_GetAllPosts, handle_GetPostById, handle_PostBlog, handle_UpdatePostById } from '../handlers/blog-post.handler';
import { handle_Register } from '../handlers/register.handler';
import { handle_Login } from '../handlers/auth.handler';
import { handle_Logout } from '../handlers/logout.handler';
import { handle_refreshToken } from '../handlers/refresh-token.handler';
import { verifyEditorRefeshJWT } from '../../middlewares/verifyEditorRefeshJWT';
import { paginate } from '../../helpers/pagination';
import blogPostModel from '../models/blog-post.model';
// import { verifyRefreshJWT } from '../../middlewares/verifyRefreshJWT';
import { verifyJWT } from '../../middlewares/verifyJWT';

const router = express.Router();

/**Auth user routes */
router.route('/auth/register').post(handle_Register);
router.route('/auth/login').post(handle_Login);
router.route('/auth/logout').get(handle_Logout);
router.route('/auth/refresh-token').get(handle_refreshToken);

/* POST Blogpost. */
// router.post('/', handle_PostBlog);
router
  .route('/blog-post')
  .post(verifyJWT, verifyEditorRefeshJWT, handle_PostBlog)
  .get(verifyJWT, paginate(blogPostModel.BlogPost), handle_GetAllPosts);
router
  .route('/blog-post/:postId')
  .get(handle_GetPostById)
  .put(verifyJWT, verifyEditorRefeshJWT, handle_UpdatePostById)
  .delete(verifyJWT, verifyEditorRefeshJWT, handle_DeletePostById);

export default router;
