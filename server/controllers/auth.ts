import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByUsername, createUser } from '../query/user';
import { parseString } from '../config/utils';

interface RequestWithUser extends Request {
  user?: User;
}

interface User {
  username: string;
  password: string;
  email: string;
}

const router = express.Router();

router.get('/me', (_req, res) => {
  res.send('hello');
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = {
    username: parseString(username),
    password: parseString(password),
  };
  const userFromDb = await getUserByUsername(user.username);
  if (!userFromDb) {
    throw new Error('invalid username or password');
  }
  else {
    const passwordCorrect = await bcrypt.compare(user.password, userFromDb.passwordHash);
    if (!passwordCorrect) {
      throw new Error('invalid username or password');
    }
    const userForToken = {
      username: userFromDb.username,
      id: userFromDb.id,
      email: userFromDb.email,
    };
    const token = jwt.sign(userForToken, process.env.SECRET as string);
    return res.status(200).send({ token, username: userFromDb.username, id: userFromDb.id });
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
  res.json(savedUser);
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

export default router;