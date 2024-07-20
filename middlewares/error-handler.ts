import express from 'express';
const winston = require('winston');

export const handleError = (err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('Error***: ', err.message);
  winston.error(err.message, err);
  // res.status(err.status || 500).send(err.message || "Something went wrong");
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Something went wrong',
    },
  });
  next();
};
