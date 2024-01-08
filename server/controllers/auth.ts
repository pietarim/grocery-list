import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  getUserByUsername, createUser, addRefreshtoken,
  getUserByRefreshToken, removeRefreshtoken
} from '../query/user';
import { parseString } from '../config/utils';
import crypto from 'crypto';

interface RequestWithUser extends Request {
  user?: User;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

const router = express.Router();

const createRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = {
    username: parseString(username),
    password: parseString(password),
  };
  console.log(11);
  const userFromDb = await getUserByUsername(user.username);
  if (!userFromDb) {
    throw new Error('invalid username or password');
  } else {
    console.log(22);
    const passwordCorrect = await bcrypt.compare(user.password, userFromDb.passwordHash);
    if (!passwordCorrect) {
      throw new Error('invalid username or password');
    }
    console.log(33);
    const userForToken = {
      username: userFromDb.username,
      id: userFromDb.id,
      email: userFromDb.email,
    };
    console.log(44);
    const refreshToken = createRefreshToken();
    console.log(55);
    addRefreshtoken(userFromDb.id, refreshToken);

    console.log(66);
    const token = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: '2m' });
    console.log(77);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none'
    });
    console.log(88);
    res.status(200).send({ token, username: userFromDb.username, id: userFromDb.id });
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, email } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = {
    username: parseString(username),
    passwordHash,
    email: parseString(email),
    isAdmin: false,
  };
  const savedUser = await createUser(user);
  res.status(200).json(savedUser);
};

export const extractUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.get('authorization');
  if (token && token.toLowerCase().startsWith('bearer ')) {
    const planeToken = token.substring(7);
    const decodedToken = jwt.verify(planeToken, process.env.SECRET as string) as User | string | undefined;
    if (!decodedToken || typeof decodedToken === 'string') {
      throw new Error('401');
    } else if (typeof decodedToken === 'object') {
      req.user = decodedToken as User;
    }
  }
};

export const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  const user = await getUserByRefreshToken(refreshToken);
  if (!user) {
    throw new Error('invalid token');
  } else {
    const userForToken = {
      username: user.username,
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: '2m' });
    res.status(200).send({ token, username: user.username, id: user.id });
  }
};

export const logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new Error('401');
  }
  const userId = req.user.id;
  await removeRefreshtoken(userId);
  res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true });
  res.send('logged out');
};

export default router;