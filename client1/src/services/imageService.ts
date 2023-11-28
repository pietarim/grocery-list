import { axios } from 'axios';

export const addImage = async (image: any) => {
  const response = await axios.post('http:localhost:3001/api/image', image);
  return response;
};