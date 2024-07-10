import express from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import env from '../../config/env';

export const handle_refreshToken = async (_req: express.Request, res: express.Response) => {
  const cookies: any = _req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookies.jwt;
  const foundUser: any = await userModel.User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);
  const envRefreshToken: string | any = env.REFRESH_TOKEN_SECRET ? env.REFRESH_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
  const envAccessToken: string | any = env.ACCESS_TOKEN_SECRET ? env.ACCESS_TOKEN_SECRET : env.ACCESS_TOKEN_SECRET;

  // evaluate jwt
  jwt.verify(refreshToken, envRefreshToken, (err: any, decoded: any) => {
    if (err || foundUser.email != decoded.email) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        userInfo: {
          name: foundUser.name,
          email: foundUser.email,
          user_id: foundUser._id,
          roles: roles,
        },
      },
      envAccessToken,
      { expiresIn: '1d' },
    );
    return res.json({ roles, accessToken });
  });
};
