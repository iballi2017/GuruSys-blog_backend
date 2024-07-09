import express from 'express';
import { handle_DeletePostById, handle_GetAllPosts, handle_PostBlog, handle_UpdatePostById } from '../handlers/blog.handler';
// import logger from '../utils/logger';
// import {healthCheck} from '../handlers/healthCheck'

const router = express.Router();

/* POST Blogpost. */
// router.post('/', handle_PostBlog);
router.route('/').post(handle_PostBlog).get(handle_GetAllPosts);
router.route('/:postId').put(handle_UpdatePostById).delete(handle_DeletePostById);

/* GET Blogpost. */
// router.get('/', handle_PostBlog);

export default router;
