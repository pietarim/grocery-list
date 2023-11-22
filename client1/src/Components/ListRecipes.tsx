import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { getRandomRecipes } from "../services/recipes";
import { Heading } from '@chakra-ui/react';

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
      <Heading as='h2' size='2xl'>Recipes</Heading>
      {recipe.map((recipe: any) => (
        <Recipe recipe={recipe} />
      ))
      }
    </div>
  );
};

export default ListRecipes;