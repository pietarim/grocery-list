import express, { Request, Response, NextFunction } from 'express';
import { createItem, getItems, updateItemQuery } from '../query/item';
import { parseString, parseNumber, parseCategory } from '../config/utils';
import { Item } from '../models';

const parseRecipeItem = (item: any) => {
  const { name, unitSize, brand, price, type } = item;
  const parsedType = parseCategory(type);
  const parsedUnitSize = parseNumber(unitSize);
  const parsedName = parseString(name);
  const parsedBrand = parseString(brand);
  const parsedPrice = parseNumber(price);
  const pricePerUnit = parsedPrice / parsedUnitSize;

  return {
    name: parsedName,
    type: parsedType,
    unitSize: parsedUnitSize,
    brand: parsedBrand,
    price: parsedPrice,
    pricePerUnit
  };
};


export const getAllItems = async (_req: Request, res: Response, next: NextFunction) => {
  const items = await getItems();
  if (!items) {
    return next(new Error('No items found'));
  }
  res.status(200).json(items);
};

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  const parsedItem = parseRecipeItem(req.body);
  const NewRecipesItem = await createItem(parsedItem);

  if (!NewRecipesItem) {
    return next(new Error('Item could not be created'));
  }

  res.status(201).json({ message: `${NewRecipesItem.name} added to item list.` });
};

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const parsedId = parseNumber(id);
  const parsedItem = parseRecipeItem(req.body);

  await updateItemQuery(parsedItem, parsedId);

  res.status(201).json({ message: `${parsedItem.name} updated.` });
};

export const removeItem = async (id: string) => {
  await Item.destroy({
    where: {
      id
    }
  });
};
