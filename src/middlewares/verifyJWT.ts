import express from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

declare module 'express-serve-static-core' {
  interface Request {
    email?: any;
    user_id?: any;
  }
}

export const verifyJWT = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const envAccessToken: string | any = env.ACCESS_TOKEN_SECRET ? env.ACCESS_TOKEN_SECRET : env.ACCESS_TOKEN_SECRET;

  console.log('verifyJWT+++++++^^^');
  const authHeader: any = _req.headers.authorization || _req.headers.Authorization;
  console.log('authHeader: ', authHeader);
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  console.log('token: ', token);

  jwt.verify(token, envAccessToken, (err: any, decoded: any) => {
    if (err) {
      // if (err) return res.sendStatus(403); //invalid token
      if (err) return res.sendStatus(401); //unauthorized
    }
    _req.email = decoded.email;
    _req.roles = decoded.roles;
    _req.user_id = decoded._id ? decoded._id.toString() : '';
  });
  console.log('PASS verifyJWT!!!!!!!!!!!!!!!!!!!!!!!!!!');
  next();
};
