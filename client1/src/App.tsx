import { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel, TabPanels, Button } from "@chakra-ui/react";
import './App.css';
import ListRecipes from './Components/ListRecipes';
import CreateRecipe from "./Components/CreateRecipe";
import ShoppingList from "./Components/ShoppingList";
import Login from "./Components/Login";
import Friend from "./Components/Friend";
import { LoggedInUserState } from './types';
import CreateNewUser from './Components/CreateNewUser';
import { useAxios } from './hooks/useAxios';
import { useAuth } from './context/AuthContext';

function App() {
  const { setToken } = useAuth();
  /* const [user, setUser] = useState<LoggedInUserState>(null); */
  /* const [recipe, setRecipe] = useState<Recipe[]>([]);
  const [imageUri, setImageUri] = useState<string>("null"); */

  useEffect(() => {
    const getAuthUser = async () => {
      const user = await useAxios.get('/auth');
      setToken({ token: user.data.token, username: user.data.username, id: user.data.id });
    };
    getAuthUser();
    /* const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } */
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  if (!user) {
    return (
      <div>
        <Login setUser={setUser} />
        <CreateNewUser setUser={setUser} />
      </div>
    );
  } else {
    return (
      <div>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab>Discover recipes</Tab>
            <Tab>My recipes</Tab>
            <Tab>Create recipe</Tab>
            <Tab>Shopping cart</Tab>
            <Tab>Friends</Tab>
            <Button onClick={() => handleLogout()}>Log out</Button>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ListRecipes />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <CreateRecipe user={user} />
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

}
/* return (
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

      <TabPanels>
        <TabPanel>
          <ListRecipes />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <CreateRecipe user={user} />
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
); */

export default App;