import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { getRandomRecipes } from "../services/recipes";
import { Heading, Divider } from '@chakra-ui/react';
import LoginForm from './Login';

const ListRecipes = () => {
  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRandomRecipes();
      setRecipe(recipes);
    };
    fetchRecipes();
  }, []);


  const [recipe, setRecipe] = useState([]);

  return (
    <div>
      <LoginForm />
      <Heading as='h2' size='2xl'>Recipes</Heading>
      {/* <DetailedRecipe recipe={recipe[0]} /> */}
      <Divider style={{ marginTop: '10px', color: 'black' }} />
      {recipe.map((recipe: any) => (
        <Recipe recipe={recipe} />
      ))
      }
    </div>
  );
};

export default ListRecipes;