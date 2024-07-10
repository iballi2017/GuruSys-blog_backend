import express from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { ConfigPassword } from '../../helpers/config-password';
import env from '../../config/env';
// import bcrypt from 'bcryptjs';

export const handle_Login = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data: any = _req.body;
  const { email, password } = data;
  const envRefreshToken: string | any = env.REFRESH_TOKEN_SECRET ? env.REFRESH_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
  const envAccessToken: string | any = env.ACCESS_TOKEN_SECRET ? env.ACCESS_TOKEN_SECRET : env.ACCESS_TOKEN_SECRET;

  try {
    await userModel.ValidateUser.validateAsync({ email, password });

    /**check for duplicate */
    const foundUser: any = await userModel.User.findOne({ email: email });
    if (!foundUser)
      return res.status(401).json({
        message: 'Auth failed',
        formData: email,
      });

    // const match = await bcrypt.compare(password, foundUser.password);
    const config_password = new ConfigPassword(password, foundUser.password);
    const match = await config_password.match();

    if (match) {
      const roles: any = Object.values(foundUser.roles).filter(Boolean);
      /**Create JWT */
      let accessToken = '';
      if (!data.rememberMe) {
        accessToken = jwt.sign(
          {
            userInfo: {
              name: foundUser.name,
              email: foundUser.email,
              user_id: foundUser._id,
              roles: roles,
            },
          },
          env.ACCESS_TOKEN_SECRET ? env.ACCESS_TOKEN_SECRET : '',
          // { expiresIn: "1hr" }
          { expiresIn: 15 },
        );
      } else {
        accessToken = jwt.sign(
          {
            userInfo: {
              name: foundUser.name,
              email: foundUser.email,
              user_id: foundUser._id,
              roles: roles,
            },
          },
          envAccessToken,
          { expiresIn: '7d' },
          // { expiresIn: 60 }
        );
      }

      let refreshToken = jwt.sign({ email: foundUser.email }, envRefreshToken, { expiresIn: '1d' });

      /**Saving refreshToken with current user */
      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      /**Creates Secure Cookie with refresh token */
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure:
          false /**Only serve on https i.e for production only*/ /** make it false if you are use VSCode Thunder Client*/ /**Without it, jwt disappears in Angular application too */,
        // sameSite: "None",
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ roles, accessToken });
      return;
    }
  } catch (error) {
    next(error);
  }
};
