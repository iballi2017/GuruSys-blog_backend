import express from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../app_api/models/user.model';
import env from '../config/env';

declare module 'express-serve-static-core' {
  interface Request {
    email?: any;
    user_id?: any;
  }
}

export const userCredentialsFromRefeshToken = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const envRefreshToken: string | any = env.REFRESH_TOKEN_SECRET ? env.REFRESH_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;

  const cookies = _req.cookies;

  // if (!cookies || !cookies.jwt)
  //   res.status(401).json({
  //     message: 'Auth failed',
  //   });
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await userModel.User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(404);

  jwt.verify(refreshToken, envRefreshToken, (err: any, decoded: any) => {
    if (err || foundUser.email != decoded.email) return res.sendStatus(403);
    _req.email = foundUser.email;
    _req.user_id = foundUser._id ? foundUser._id.toString() : '';
  });

  next();
};
