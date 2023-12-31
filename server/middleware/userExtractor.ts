import { Request, Response, NextFunction } from 'express';
import { parseUser } from '../config/utils';
import { TokenUser } from '../types';
import jwt from 'jsonwebtoken';

interface RequestWithToken extends Request {
  user?: TokenUser;
}

export const userExtractor = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const authentication = req.get('authorization');
  if (authentication && authentication.toLowerCase().startsWith('bearer ')) {
    const token = authentication.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET as string);
    req.user = parseUser(decodedToken);
  }
  next();
};