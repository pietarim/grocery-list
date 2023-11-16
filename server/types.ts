export enum ItemCategory {
  Meat = 'meat',
  Vegetable = 'vegetable',
  Fruit = 'fruit',
  Dairy = 'dairy',
  Grain = 'grain',
  Other = 'other',
  Spice = 'spice',
  Premade = 'premade',
  FrozenPremade = 'frozen_premade',
  Candy = 'candy',
  Sauce = 'sauce',
  Fish = 'fish',
  Seafood = 'seafood',
  Baking = 'baking'
}

/* export interface NewItem {
  name: string;
  itemCategory: ItemCategory;
} */

export interface NewItem {
  name: string;
  ammount: number;
  id: number;
}

export interface NewRecipeToItem {
  recipeId: number;
  itemId: number;
  ammount: number;
}