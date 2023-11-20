import { Item } from './item';
import { Recipe } from './recipe';
import { RecipeToItem } from './recipeToItem';
import { User } from './user';
import { RecipeLike } from './recipeLike';

Recipe.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Recipe, { foreignKey: 'ownerId' });
Item.belongsToMany(Recipe, { through: RecipeToItem, as: 'included' });
Recipe.belongsToMany(Item, { through: RecipeToItem, as: 'item' });
Recipe.belongsToMany(User, { through: RecipeLike, as: 'liked' });
User.belongsToMany(Recipe, { through: RecipeLike, as: 'liked' });
User.hasMany(RecipeLike, { foreignKey: 'userId' });
RecipeLike.belongsTo(User, { foreignKey: 'userId' });

export { Item, Recipe, RecipeToItem, User, RecipeLike };