import { IRecipe, IFollower } from '../../models/recipe';
import { IUser } from '../../models/user';

export const setRecipeProps = (recipe: IRecipe, user: IUser) => {
  recipe.isFollowing = recipe.followers.some(
    (r) => r.username === user.username
  );
  recipe.isCreator = recipe.followers.some(
    (r) => r.username === user.username && r.isCreator
  );

  return recipe;
};

export const createFollower = (user: IUser): IFollower => {
  return {
    displayName: user.displayName,
    isCreator: false,
    username: user.username,
    image: user.image!,
  };
};
