import { useEffect, useState } from "react";
import { getRandomRecipes } from "../services/recipes";

const Recipe = () => {

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRandomRecipes();
      setRecipe(recipes);
    };
    fetchRecipes();
  }, []);


  const [recipe, setRecipe] = useState([]);

  console.log(recipe);


  return (
    <div>
      <h1>Recipe</h1>
      {recipe.map((recipe: any) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.unitSize}</p>
          <p>{recipe.like_count}</p>
        </div>))}
    </div>
  );
};

export default Recipe;