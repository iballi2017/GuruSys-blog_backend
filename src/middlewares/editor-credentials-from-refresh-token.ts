import express from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../app_api/models/user.model';
import env from '../config/env';
import { ROLE_LIST } from '../config/role-list';

declare module 'express-serve-static-core' {
  interface Request {
    email?: any;
    user_id?: any;
    roles?: any;
  }
}

export const editorCredentialsFromRefeshToken = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const envRefreshToken: string | any = env.REFRESH_TOKEN_SECRET ? env.REFRESH_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;

  const cookies = _req.cookies;
  console.log('cookies: ', cookies);
  if (!cookies?.jwt)
    return res.status(401).json({
      message: 'Auth failed!',
    });

  const refreshToken = cookies.jwt;

  const foundUser: any = await userModel.User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(404);

  const roles = Object.values(foundUser.roles).filter(Boolean);
  const isEditor = roles.includes(ROLE_LIST.Editor);
  if (!isEditor) return res.sendStatus(401);

  jwt.verify(refreshToken, envRefreshToken, (err: any, decoded: any) => {
    if (err || foundUser.email != decoded.email) return res.sendStatus(403);
    _req.email = foundUser.email;
    _req.roles = foundUser.roles;
    _req.user_id = foundUser._id ? foundUser._id.toString() : '';
  });

  next();
};
