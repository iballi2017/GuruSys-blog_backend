import express from 'express';
// import env from 'src/config/env';

export const handle_GetAllPosts = async (_req: express.Request, res: express.Response) => {
  res.send('GET all posts request');
};


export const handle_PostBlog = async (_req: express.Request, res: express.Response) => {
  const userId = _req.user_id ;
  console.log("userId: ", userId);
  const data = _req.body;
  console.log('data: ', data);


  res.send('POST blog request');
};

export const handle_GetPostById = async (_req: express.Request, res: express.Response) => {
  res.send('GET post request');
};

export const handle_UpdatePostById = async (_req: express.Request, res: express.Response) => {
  res.send('UPDATE post request');
};

export const handle_DeletePostById = async (_req: express.Request, res: express.Response) => {
  res.send('DELETE post request');
};
