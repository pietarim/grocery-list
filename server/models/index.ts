import { Item } from './item';
import { Recipe } from './recipe';
import { RecipeToIncredient } from './recipeToIncredient';
import { User } from './user';

Recipe.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Recipe, { foreignKey: 'ownerId' });
Item.belongsToMany(Recipe, { through: RecipeToIncredient, as: 'item' });

export { Item, Recipe, RecipeToIncredient, User };