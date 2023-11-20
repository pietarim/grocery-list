/* interface Item {
  name: string;
  type: string;
  unitSize: number;
  brand: string;
  price: number;
  pricePerUnit: number;
}

type foodType = 'meat' | 'vegetable' | 'spice' | 'other' | 'rice' | 'premade' | 'frozen_premade' | 'candy' | 'sauce' | 'fish' | 'seafood' | 'dairy' | 'fruit' | 'baking' | 'other' | 'ice cream' | 'frozen_prem';
 */
import { Item } from "../models";
import { NewItem, ItemCategory } from "../types";

export const items: NewItem[] = [
  {
    name: "muikut",
    type: ItemCategory.Fish,
    unitSize: 0.15,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 13.27,
  },
  {
    name: "beef steak",
    type: ItemCategory.Meat,
    unitSize: 0.5,
    brand: "farmfresh",
    price: 5.99,
    pricePerUnit: 11.98,
  },
  {
    name: "carrot",
    type: ItemCategory.Vegetable,
    unitSize: 0.2,
    brand: "greenValley",
    price: 0.99,
    pricePerUnit: 4.95,
  },
  {
    name: "black pepper",
    type: ItemCategory.Spice,
    unitSize: 0.05,
    brand: "spiceKing",
    price: 3.49,
    pricePerUnit: 69.8,
  },
  /* 5 bellow */
  {
    name: "basmati rice",
    type: ItemCategory.Grain,
    unitSize: 1,
    brand: "eastAroma",
    price: 2.99,
    pricePerUnit: 2.99,
  },
  {
    name: "lasagna",
    type: ItemCategory.Premade,
    unitSize: 0.5,
    brand: "quickMeal",
    price: 4.99,
    pricePerUnit: 9.98,
  },
  {
    name: "frozen pizza",
    type: ItemCategory.FrozenPremade,
    unitSize: 0.4,
    brand: "frostyGood",
    price: 3.99,
    pricePerUnit: 9.975,
  },
  {
    name: "chocolate bar",
    type: ItemCategory.Candy,
    unitSize: 0.1,
    brand: "sweetTooth",
    price: 1.29,
    pricePerUnit: 12.9,
  },
  {
    name: "tomato sauce",
    type: ItemCategory.Sauce,
    unitSize: 0.3,
    brand: "italiano",
    price: 2.49,
    pricePerUnit: 8.3,
  },
  /* 10 bellow */
  {
    name: "shrimp",
    type: ItemCategory.Seafood,
    unitSize: 0.2,
    brand: "oceanFresh",
    price: 6.99,
    pricePerUnit: 34.95,
  },
  {
    name: "cheddar cheese",
    type: ItemCategory.Dairy,
    unitSize: 0.25,
    brand: "dairyFarm",
    price: 3.99,
    pricePerUnit: 15.96,
  },
  {
    name: "apple",
    type: ItemCategory.Fruit,
    unitSize: 0.2,
    brand: "orchard",
    price: 0.69,
    pricePerUnit: 3.45,
  },
  {
    name: "flour",
    type: ItemCategory.Baking,
    unitSize: 1,
    brand: "bakeMaster",
    price: 1.99,
    pricePerUnit: 1.99,
  },
  {
    name: "pickles",
    type: ItemCategory.Other,
    unitSize: 0.3,
    brand: "crunchy",
    price: 2.99,
    pricePerUnit: 9.97,
  },
  /* 15 bellow */
  {
    name: "salmon",
    type: ItemCategory.Fish,
    unitSize: 0.2,
    brand: "riverFresh",
    price: 4.99,
    pricePerUnit: 24.95,
  },
  {
    name: "pork ribs",
    type: ItemCategory.Meat,
    unitSize: 0.7,
    brand: "farmhouse",
    price: 7.49,
    pricePerUnit: 10.7,
  },
  {
    name: "broccoli",
    type: ItemCategory.Vegetable,
    unitSize: 0.25,
    brand: "greenHarvest",
    price: 1.29,
    pricePerUnit: 5.16,
  },
  {
    name: "cinnamon",
    type: ItemCategory.Spice,
    unitSize: 0.04,
    brand: "spiceWorld",
    price: 2.99,
    pricePerUnit: 74.75,
  },
  {
    name: "korppujauho",
    type: ItemCategory.Other,
    unitSize: 0.4,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 7.98,
  },
  /* 20 bellow */
  {
    name: "butter",
    type: ItemCategory.Dairy,
    unitSize: 0.25,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 7.96,
  },
  {
    name: "oat",
    type: ItemCategory.Other,
    unitSize: 1,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 1.99,
  },
  {
    name: "rice milk",
    type: ItemCategory.Other,
    unitSize: 1,
    brand: "kotimaista",
    price: 1.99,
    pricePerUnit: 1.99,
  }

];