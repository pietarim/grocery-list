import { createSlice } from '@reduxjs/toolkit';

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

const initialState: ShoppingCartState = {
  items: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    removeProduct(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;