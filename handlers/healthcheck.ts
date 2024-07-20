import express from 'express';
import Logger from '../utils/logger';

export const healthCheck = async (_req: express.Request, res: express.Response) => {
  Logger.info('Server is starting');
  res.send('Server is working');
};
