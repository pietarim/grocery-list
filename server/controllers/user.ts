import { sequelize } from "../config/db";
import { parseString } from "../config/utils";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const createUser = async (req: any, res: any) => {
  const { username, password, email } = req.body;
  const parsedUsername = parseString(username);
  const parsedPassword = parseString(password);
  const parsedEmail = parseString(email);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(parsedPassword, saltRounds);
  const newUser = await User.create({
    username: parsedUsername,
    passwordHash,
    email: parsedEmail,
    isAdmin: false,
  });

  res.status(200).json(newUser);
};

