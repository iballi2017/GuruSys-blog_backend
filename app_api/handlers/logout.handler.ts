import express from 'express';
import userModel from '../models/user.model';

export const handle_Logout = async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  const cookies = _req.cookies;
  if (!cookies && !cookies.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  try {
    const foundUser: any = await userModel.User.findOne({ refreshToken });
    if (!foundUser) return res.clearCookie('jwt', refreshToken), res.status(200).json({ message: 'Logout successful!!!' });

    foundUser.refreshToken = '';
    await foundUser.save();
    res.clearCookie('jwt', refreshToken);
    res.status(200).json({
      message: 'Logout successful!!!',
    });
  } catch (error) {
    next(error);
  }
};
