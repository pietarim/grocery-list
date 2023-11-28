import { NewRecipesItem, ItemCategory } from '../types';

export const parseIncredient = (item: unknown): NewRecipesItem => {
  if (
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'amount' in item &&
    'id' in item
  ) {
    const ing = item as {
      name: unknown, amount: unknown, id: unknown;
    };

    if (typeof ing.name !== 'string') {
      throw new Error('Invalid incredient name');
    }

    if (
      typeof ing.amount !== 'number') {
      throw new Error('Invalid incredient amount');
    }

    if (typeof ing.id !== 'number') {
      throw new Error('Invalid incredient id');
    }
  }

  throw new Error('Invalid incredient');
};

export const parseCategory = (category: unknown): ItemCategory => {
  if (typeof category === 'string' && Object.values(ItemCategory).includes(category as ItemCategory)) {
    return category as ItemCategory;
  }
  throw new Error('Invalid category');
};

/* export const parseIncredient = (: unknown): NewRecipesItem => {
  if (
    typeof  === 'object' &&
     !== null &&
    'name' in  &&
    'itemCategory' in 
  ) {
    const ing =  as { name: unknown, itemCategory: unknown; };

    if (typeof ing.name !== 'string') {
      throw new Error('Invalid incredient name');
    }

    if (
      typeof ing.itemCategory === 'string' &&
      Object.values(ItemCategory).includes(ing.itemCategory as ItemCategory)
    ) {
      return ing as NewRecipesItem;
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

export const parseNumber = (ownerId: unknown): number => {
  if (typeof ownerId === 'number') {
    return ownerId;
  }
  throw new Error('Invalid ownerId');
};

export const parseBoolean = (global: unknown): boolean => {
  if (typeof global === 'boolean') {
    return global;
  }
  throw new Error('Invalid global');
};