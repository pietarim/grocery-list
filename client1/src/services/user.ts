import axios from 'axios';

const baseUrl = 'http://localhost:3001';

interface Credentials {
  username: string;
  password: string;
}

export const login = async (credentials: Credentials) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, credentials, { withCredentials: true });
  return response.data;
};

export const register = async (credentials: Credentials) => {
  console.log('axios running');
  const response = await axios.post(`${baseUrl}/api/auth/register`, credentials);
  return response.data;
};