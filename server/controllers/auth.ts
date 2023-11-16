import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../query/user';

const router = express.Router();

router.get('/me', (_req, res) => {
  res.send('hello');
});

router.post('/login', async (_req, res) => {
  const { username, password } = _req.body;
  const user = {
    username,
    password,
  };
  const userFromDb = await getUserByUsername(user.username);
  if (!userFromDb) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
  const passwordCorrect = await bcrypt.compare(user.password, userFromDb.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
  const userForToken = {
    username: userFromDb.username,
    id: userFromDb.id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET as string);
  return res.status(200).send({ token, username: userFromDb.username, id: userFromDb.id });
});


export default router;