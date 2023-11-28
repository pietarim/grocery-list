/* import { ChakraProvider } from '@chakra-ui/react' */
/* import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'; */
import { Tabs, TabList, Tab, TabPanel, TabPanels, Button } from "@chakra-ui/react";
import './App.css';
import ListRecipes from './Components/ListRecipes';
import CreateRecipe from "./Components/CreateRecipe";
import ShoppingList from "./Components/ShoppingList";
import Friend from "./Components/Friend";


function App() {
  /* const [recipe, setRecipe] = useState<Recipe[]>([]);
  const [imageUri, setImageUri] = useState<string>("null"); */

  /* useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await axios.get('http://localhost:3001/api/recipes');
      const recipeData = recipes.data as Recipe[];
      setImageUri(`http://localhost:3001/api/images/${recipeData[0].imageUri}`);
    };
    fetchRecipes();
  }, []); */

  /* const returnImage = () => {
    if (imageUri !== "null") {
      return (
        <img style={{ 'height': 512, 'width': 512 }} src={imageUri} />
      );
    } */

  /* if (recipe[0]) {
    console.log(recipe[0]);
    if (recipe[0].imageUri) {
      console.log('true');
    }
  }
   
  console.log(recipe[0].imageUri); */


  return (
    <div>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Discover recipes</Tab>
          <Tab>My recipes</Tab>
          <Tab>Create recipe</Tab>
          <Tab>Shopping cart</Tab>
          <Tab>Friends</Tab>
          <Button>Log out</Button>
        </TabList>
        {/* <ListRecipes /> */}

        <TabPanels>
          <TabPanel>
            <ListRecipes />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <CreateRecipe />
          </TabPanel>
          <TabPanel>
            <ShoppingList />
          </TabPanel>
          <TabPanel>
            <Friend />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
{/* <>
      <div className="card">
        <ListRecipes />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </> */}

export default App;