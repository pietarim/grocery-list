export enum IngredientCategory {
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

export interface NewIngredient {
  name: string;
  ingredientCategory: IngredientCategory;
}