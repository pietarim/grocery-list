import axios from 'axios';

export const getRandomRecipes = async () => {
  const response = await axios.get('http://localhost:3001/api/recipes');
  return response.data;
};