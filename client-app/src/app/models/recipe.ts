export interface IRecipe {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  notes: string;
  prepTime: string;
  cookTime: string;
  isPrivate: boolean;
  isFollowing: boolean;
  isCreator: boolean;
  followers: IFollower[];
}

export interface IRecipeFormValues extends Partial<IRecipe> {}

export class RecipeFormValues implements IRecipeFormValues {
  id?: string = undefined;
  title: string = '';
  description: string = '';
  source: string = '';
  url: string = '';
  notes: string = '';
  prepTime: string = '';
  cookTime: string = '';
  isPrivate: boolean = false;

  /**
   *
   */
  constructor(init?: IRecipeFormValues) {
    Object.assign(this, init);
  }
}

export interface IFollower {
  username: string;
  displayName: string;
  image: string;
  isCreator: boolean;
}
