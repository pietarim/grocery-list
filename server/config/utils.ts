import { NewIngredient, IngredientCategory } from '../types';

export const parseIncredient = (ingredient: unknown): NewIngredient => {
  if (
    typeof ingredient === 'object' &&
    ingredient !== null &&
    'name' in ingredient &&
    'ammount' in ingredient &&
    'id' in ingredient
  ) {
    const ing = ingredient as { name: unknown, ammount: unknown, id: unknown; };

    if (typeof ing.name !== 'string') {
      throw new Error('Invalid incredient name');
    }

    if (
      typeof ing.ammount !== 'number') {
      throw new Error('Invalid incredient ammount');
    }

    if (typeof ing.id !== 'number') {
      throw new Error('Invalid incredient id');
    }
  }

  throw new Error('Invalid incredient');
};

/* export const parseIncredient = (ingredient: unknown): NewIngredient => {
  if (
    typeof ingredient === 'object' &&
    ingredient !== null &&
    'name' in ingredient &&
    'ingredientCategory' in ingredient
  ) {
    const ing = ingredient as { name: unknown, ingredientCategory: unknown; };

    if (typeof ing.name !== 'string') {
      throw new Error('Invalid incredient name');
    }

    if (
      typeof ing.ingredientCategory === 'string' &&
      Object.values(IngredientCategory).includes(ing.ingredientCategory as IngredientCategory)
    ) {
      return ing as NewIngredient;
    }
  }

  throw new Error('Invalid incredient');
}; */

export const parseString = (name: unknown): string => {
  if (typeof name === 'string') {
    return name;
  }
  throw new Error('Invalid name');
};

export const parseDescription = (description: unknown): string => {
  if (typeof description === 'string') {
    return description;
  }
  throw new Error('Invalid description');
};

export const parseOwnerId = (ownerId: unknown): number => {
  if (typeof ownerId === 'number') {
    return ownerId;
  }
  throw new Error('Invalid ownerId');
};

export const parseGlobal = (global: unknown): boolean => {
  if (typeof global === 'boolean') {
    return global;
  }
  throw new Error('Invalid global');
};