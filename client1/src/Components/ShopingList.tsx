import { useDispatch, useSelector } from "react-redux";
import { Heading, List, ListItem, Button } from "@chakra-ui/react";

interface RecipeItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  amount: number;
  isTitle?: string;
}

interface ShoppingCartState {
  items: RecipeItem[];
}

interface AppState {
  shoppingCart: ShoppingCartState;

}

/* const initialState: ShoppingCartState = {
  items: [],
}; */

const ShoppingList = () => {
  /* const dispatch = useDispatch(); */
  const shoppingList = useSelector((state: AppState) => state.shoppingCart);


  return (
    <div>
      <Heading as="h2" size="2xl">
        Shopping list
      </Heading>
      <List>
        {shoppingList.items.map((item) => (
          <ListItem key={item.id}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShoppingList;