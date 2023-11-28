import { Card, CardHeader, CardBody, CardFooter, Image, Stack, CloseButton, Heading, Text, Button, Flex, Divider } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/modules/shoppingCart';

const DetailedRecipe = ({ recipe }: any) => {
  /* const [recipeImage, setRecipeImage] = useState<string | null>(null); */
  const dispatch = useDispatch();
  console.log(recipe);

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
  const handleAddToCart = () => {
    console.log('add to cart');
    dispatch(addProduct(recipe));
  };


  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      style={{ marginTop: '1rem', marginBottom: '1rem' }}
    >
      <Flex direction="column" justify="space-between" flex="1">
        <CardBody>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Heading size='xl' textAlign="center" flex="1">{recipe.name}</Heading>
            <CloseButton />
          </Flex>
          <Divider />
          <Flex direction="row" justify="space-between" flex="1">
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={`http://localhost:3001/api/images/${recipe.imageUri}`}
              alt={recipe.name}
            />
            <div>
              <Text fontSize='lg' style={{ margin: '12px' }}>
                {recipe.description}
              </Text>
            </div>
            <Card minW='175px'>
              {recipe.item.map((i, index) => (
                <Text key={index}>
                  {i.name}: {i.recipeToItem.amount}
                </Text>
              ))}
            </Card>
          </Flex>
        </CardBody>

        <CardFooter>
          <Button variant='outline' colorScheme='blue'>
            Add to cart
          </Button>
          <Button variant='ghost' onClick={() => handleAddToCart()} /* leftIcon={<BiLike />} */>
            Like
          </Button>
        </CardFooter>
      </Flex>
    </Card>
  );
};

export default DetailedRecipe;