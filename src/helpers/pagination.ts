import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

declare module 'express-serve-static-core' {
  interface Response {
    paginatedResults?: any;
    count?: any;
  }
}

export const paginate = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.PageNumber as string) || 1;
  const limit = parseInt(req.query.PageSize as string) || 10;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: any = {};

    let count: any = await model.countDocuments().exec();

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model.find().limit(limit).skip(startIndex).exec();
    res.paginatedResults = results;
    res.count = count;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
