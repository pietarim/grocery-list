import { NewItem, ItemCategory } from '../types';

export const parseIncredient = (item: unknown): NewItem => {
  if (
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'ammount' in item &&
    'id' in item
  ) {
    const ing = item as {
      name: unknown, ammount: unknown, id: unknown;
    };

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

/* export const parseIncredient = (: unknown): NewItem => {
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
      return ing as NewItem;
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