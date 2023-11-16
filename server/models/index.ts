import { Item } from './item';
import { Recipe } from './recipe';
import { RecipeToItem } from './recipeToItem';
import { User } from './user';

Recipe.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Recipe, { foreignKey: 'ownerId' });
Item.belongsToMany(Recipe, { through: RecipeToItem, as: 'item' });
Recipe.belongsToMany(Item, { through: RecipeToItem, as: 'item' });

export { Item, Recipe, RecipeToItem, User };