import express from 'express';
import userModel from '../models/user.model';
// const bcrypt = require("bcryptjs");
import bcrypt from 'bcryptjs';

export const handle_Register = async (_req: express.Request, res: express.Response) => {
  // const data = _req.body;
  const { name, email, password } = _req.body;

  try {
    await userModel.ValidateUser.validateAsync({ email, password });

    /**check for duplicate */
    const duplicate = await userModel.User.findOne({ email: email }).exec();
    if (duplicate)
      return res.status(409).json({
        message: 'User already exist!',
        formDAta: email,
      });

    /**save data */
    // encrypt the password
    const hashPwd = await bcrypt.hash(password, 10);

    // create and store new user
    const result = await userModel.User.create({
      name: name,
      email: email,
      password: hashPwd,
    });

    if (result) {
      return res.status(201).json({
        message: `Account created for ${email}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: email,
    });
  }
};
