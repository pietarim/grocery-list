import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Flex, Divider } from '@chakra-ui/react';
/* import { useEffect, useState } from "react";
import { getRandomRecipes } from "../services/recipes"; */
import { useEffect, useState } from 'react';
import { getRecipeImage } from '../services/image';

const Recipe = ({ recipe }: any) => {
  /* const [recipeImage, setRecipeImage] = useState<string | null>(null); */


  /* useEffect(() => {
    const fetchRecipeImage = async () => {
      const image = await getRecipeImage(recipe.imageUri);
      setRecipeImage(`http://localhost:3001/api/images/${image}`);
    };
    fetchRecipeImage();
  }, []); */
  /* useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRandomRecipes();
      setRecipe(recipes);
    };
    fetchRecipes();
  }, []);


  const [recipe, setRecipe] = useState([]); */

  console.log(recipe);

  const returnImage = () => {
    if (recipe.imageUri) {
      return (
        <img style={{ 'height': 512, 'width': 512 }} src={`http://localhost:3001/api/images/${recipe.imageUri}`} />
      );
    }
  };

  /* const returnItems = () => {
    if (recipe.items) { */
  /* return (
    <div>
      {recipe.item.map((i: any) => (
        <p key={i.id}>{i.name}</p>
      ))}
    </div>
  ); */
  /* }
}; */


  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      style={{ marginTop: '1rem', marginBottom: '1rem' }}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={`http://localhost:3001/api/images/${recipe.imageUri}`}
        alt={recipe.name}
      />
      <Flex direction="column" justify="space-between" flex="1">
        <CardBody>
          <Heading size='md'>{recipe.name}</Heading>
          <Divider />
          <Flex direction="row" justify="space-between" flex="1">
            <Text noOfLines={3}>
              {recipe.description}
            </Text>
            <Card minW='175px'>
              {recipe.item.map((i, index) => (
                <Text key={index} noOfLines={3}>
                  {i.name}
                </Text>
              ))}
            </Card>
          </Flex>
        </CardBody>

        <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            View recipe
          </Button>
          <Button variant='outline' colorScheme='blue'>
            Add to cart
          </Button>
          <Button flex='1' variant='ghost' /* leftIcon={<BiLike />} */>
            Like
          </Button>
        </CardFooter>
      </Flex>
    </Card>
  );
};
{/* <div>
      <div key={recipe.id}>
        {returnImage()}

        <h2>{recipe.name}</h2>
        <p>{recipe.unitSize}</p>
        <p>{recipe.like_count}</p>
      </div>
    </div> */}

export default Recipe;