import express from 'express';
import blogPostModel from '../models/blog-post.model';
// import env from 'src/config/env';

export const handle_PostBlog = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId = _req.user_id;
  const data = _req.body;
  try {
    const result = await blogPostModel.BlogPost.create({
      author: userId,
      title: data.title,
      body: data.body,
      updatedBy: userId,
    });

    res.status(201).json({
      message: 'Post created!',
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const handle_GetAllPosts = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // const result = await blogPostModel.BlogPost.find();
    // console.log("handle_GetAllPosts result: ", result)
    // console.log("_____________________________+++++++++++++++++++++++++++_______________________________________")
    // console.log("handle_GetAllPosts res.paginatedResults: ", res.paginatedResults, res.count)
    await blogPostModel.BlogPost.find();
    res.status(200).json({
      message: 'LIST OF POSTS',
      totalSize: res.count,
      result: res.paginatedResults,
    });
  } catch (error) {
    next(error);
  }
};

export const handle_GetPostById = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const postId = _req.params.postId;

  try {
    const result = await blogPostModel.BlogPost.findOne({ _id: postId });
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const handle_UpdatePostById = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId = _req.user_id;
  const postId = _req.params.postId;
  const data = _req.body;

  try {
    const foundPost = await blogPostModel.BlogPost.findOne({ _id: postId });
    if (!foundPost) return res.sendStatus(404);

    const result = await blogPostModel.BlogPost.updateOne({ _id: postId }, { ...data, updatedBy: userId, updatedAt: new Date() });

    if (result && result.acknowledged) {
      return res.status(200).json({
        message: 'POST UPDATED!',
        result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const handle_DeletePostById = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const postId = _req.params.postId;

  try {
    const foundPost = await blogPostModel.BlogPost.findOne({ _id: postId });

    if (!foundPost)
      return res.status(404).json({
        message: 'Post not found',
      });

    const result = await blogPostModel.BlogPost.deleteOne({ _id: postId });

    res.status(200).json({
      message: 'Post deleted!',
      result,
    });
  } catch (error) {
    next(error);
  }
};
