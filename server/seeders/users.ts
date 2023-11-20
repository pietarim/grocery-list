interface User {
  username: string;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
}

export const users: User[] = [
  {
    username: "test",
    email: "user@gmail.com",
    passwordHash: "password",
    isAdmin: false,
  },
  {
    username: "Carl",
    email: "carl@gmail.com",
    passwordHash: "secret123",
    isAdmin: false,
  },
  {
    username: "Alice",
    email: "alice@example.com",
    passwordHash: "password",
    isAdmin: true,
  },
  {
    username: "Bob",
    email: "bob@example.com",
    passwordHash: "secret123",
    isAdmin: false,
  },
  {
    username: "Diana",
    email: "diana@example.com",
    passwordHash: "password",
    isAdmin: false,
  },
  {
    username: "Ethan",
    email: "ethan@example.com",
    passwordHash: "secret123",
    isAdmin: true,
  },
  {
    username: "Fiona",
    email: "fiona@example.com",
    passwordHash: "password",
    isAdmin: false,
  },
  {
    username: "George",
    email: "george@example.com",
    passwordHash: "secret123",
    isAdmin: false,
  },
  {
    username: "Hannah",
    email: "hannah@example.com",
    passwordHash: "password",
    isAdmin: true,
  },
  {
    username: "Ian",
    email: "ian@example.com",
    passwordHash: "secret123",
    isAdmin: false,
  }
];