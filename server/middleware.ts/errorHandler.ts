import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface ErrorWithMessage extends Error { // replace Error with right type
  message: string;
}

export const errorHandler: ErrorRequestHandler = (error: ErrorWithMessage, _req: Request, res: Response, next: NextFunction) => {
  if (error.message === '401') {
    return res.status(401).json({
      error: 'invalid token',
    });
  }
  next(error);
};