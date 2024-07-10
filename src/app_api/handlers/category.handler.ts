import express from 'express';
import blogCategoryModel from '../models/blog-category.model';
import userModel from '../models/user.model';

export const handle_PostCategory = async (_req: express.Request, res: express.Response) => {
  const data: any = _req.body;
  const { title, description } = data;
  const cookies: any = _req.cookies;

  if (!cookies && !cookies?.jwt) {
    return res.sendStatus(401);
  }

  try {
    await blogCategoryModel.ValidateCategory.validateAsync({ title });

    const refreshToken: string = cookies.jwt;
    const foundUser: any = await userModel.User.findOne({ refreshToken });

    if (!foundUser) return res.sendStatus(403);

    /**check for duplicate */
    const foundCategory: any = await blogCategoryModel.Category.findOne({ title: title });
    if (foundCategory)
      return res.status(409).json({
        message: 'Category already exist!',
        formData: title,
      });

    const result = await blogCategoryModel.Category.create({
      title,
      description,
      createdBy: foundUser._id.toString(),
    });

    if (result)
      return res.status(201).json({
        message: 'Category created!',
        result,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      formData: title,
    });
  }
};

export const handle_DeleteCategoryCategoryId = async (_req: express.Request, res: express.Response) => {
  const categoryId = _req.params.categoryId;

  const foundCategory = await blogCategoryModel.Category.findOne({ _id: categoryId });

  if (!foundCategory)
    return res.status(404).json({
      message: 'Category not found!',
    });

  const result = await blogCategoryModel.Category.deleteOne({ _id: categoryId });
  if (result)
    return res.status(200).json({
      message: 'Category deleted!',
    });
};
