import { Request, Response, NextFunction } from 'express';

interface RequestWithToken extends Request {
  token?: string;
}

export const userExtractor = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const token = req.get('authorization');
  if (token && token.toLowerCase().startsWith('bearer ')) {
    req.token = token.substring(7);
  }
  next();
};