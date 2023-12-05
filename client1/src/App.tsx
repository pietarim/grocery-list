import { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel, TabPanels, Button, Text, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import './App.css';
import ListRecipes from './Components/ListRecipes';
import CreateRecipe from "./Components/CreateRecipe";
import ShoppingList from "./Components/ShoppingList";
import Login from "./Components/Login";
import CreateNewUser from './Components/CreateNewUser';
import { useAxios } from './hooks/useAxios';
import { useAuth } from './hooks/useAuth';

function App() {
  const { setToken, token } = useAuth();
  const { get } = useAxios();
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileRoute, setMobileRoute] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };
    window.addEventListener('resize', handleResize); // TODO is this doing anything?
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const user = await get('/auth/access-token', { withCredentials: true });
        setToken({ token: user.data.token, username: user.data.username, id: user.data.id }); // handle error
      } catch (err) {
        console.log('not logged in');
      }

    };
    getAuthUser();
  }, []);

  const handleLogout = () => {
    setToken(null);
  };

  if (!token) {
    return (
      <div>
        <Login />
        <CreateNewUser />
      </div>
    );
  } else {
    if (isMobileView) {
      const returnMobileRoute = () => {
        switch (mobileRoute) {
          case "view":
            return <ListRecipes isMobile={true} />;
          case "create":
            return <CreateRecipe isMobile={true} />;
          case "shopping-cart":
            return <ShoppingList isMobile={true} />;
          default:
            return <ListRecipes isMobile={true} />;
        }
      };
      return (
        <>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem onClick={() => setMobileRoute("view")}>Discover recipes</MenuItem>
              <MenuItem onClick={() => setMobileRoute("create")}>Create recipe</MenuItem>
              <MenuItem onClick={() => setMobileRoute("shopping-cart")}>Shopping list</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Log out</MenuItem>
            </MenuList>
          </Menu>
          {returnMobileRoute()}
        </>
      );
    } else if (!isMobileView) {
      return (
        <div>
          <Tabs variant='enclosed'>
            <TabList>
              <Tab>Discover recipes</Tab>
              <Tab>My recipes</Tab>
              <Tab>Create recipe</Tab>
              <Tab>Shopping cart</Tab>
              <Tab>Friends</Tab>
              <Text>User: {token.username} logged in</Text>
              <Button onClick={() => handleLogout()}>Log out</Button>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ListRecipes isMobile={false} />
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
            </TabPanels>
          </Tabs>
        </div>
      );
    }
  }
}

export default App;