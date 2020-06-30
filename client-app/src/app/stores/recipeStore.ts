import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IRecipe } from '../models/recipe';
import agent from '../api/agent';
import { history } from '../../';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { setRecipeProps, createFollower } from '../common/utility/util';

export default class RecipeStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable recipeRegistry = new Map();
  @observable recipe: IRecipe | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;

  @computed get recipesByTitle() {
    return Array.from(this.recipeRegistry.values()).sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  }

  @action loadRecipes = async () => {
    this.loadingInitial = true;
    try {
      const recipes = await agent.Recipes.list();
      runInAction('loading recipes', () => {
        recipes.forEach((recipe) => {
          setRecipeProps(recipe, this.rootStore.userStore.user!);
          this.recipeRegistry.set(recipe.id, recipe);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('loading recipes error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadRecipe = async (id: string) => {
    let recipe = this.getRecipe(id);
    if (recipe) {
      this.recipe = recipe;
      return recipe;
    } else {
      this.loadingInitial = true;
      try {
        recipe = await agent.Recipes.details(id);
        runInAction('getting Recipe', () => {
          setRecipeProps(recipe, this.rootStore.userStore.user!);
          this.recipe = recipe;
          this.recipeRegistry.set(recipe.id, recipe);
          this.loadingInitial = false;
        });
        return recipe;
      } catch (error) {
        runInAction('get recipe error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearRecipe = () => {
    this.recipe = null;
  };

  getRecipe = (id: string) => {
    return this.recipeRegistry.get(id);
  };

  @action createRecipe = async (recipe: IRecipe) => {
    this.submitting = true;
    try {
      await agent.Recipes.create(recipe);
      runInAction('creating recipe', () => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.submitting = false;
      });
      history.push(`/recipes/${recipe.id}`);
    } catch (error) {
      runInAction('creating recipe error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editRecipe = async (recipe: IRecipe) => {
    this.submitting = true;
    try {
      await agent.Recipes.update(recipe);
      runInAction('editing recipe', () => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.recipe = recipe;
        this.submitting = false;
      });
      history.push(`/recipes/${recipe.id}`);
    } catch (error) {
      runInAction('editing recipe error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action deleteRecipe = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Recipes.delete(id);
      runInAction('deleting recipe', () => {
        this.recipeRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('deleting recipe error', () => {
        this.submitting = false;
        this.target = '';
      });

      console.log(error);
    }
  };

  @action followRecipe = async () => {
    const follower = createFollower(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Recipes.follow(this.recipe!.id);
      runInAction(() => {
        if (this.recipe) {
          this.recipe.followers.push(follower);
          this.recipe.isFollowing = true;
          this.recipeRegistry.set(this.recipe.id, this.recipe);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem following recipe');
    }
  };

  @action unfollowRecipe = async () => {
    this.loading = true;
    try {
      await agent.Recipes.unfollow(this.recipe!.id);
      runInAction(() => {
        if (this.recipe) {
          this.recipe.followers = this.recipe.followers.filter(
            (f) => f.username !== this.rootStore.userStore.user!.username
          );
          this.recipe.isFollowing = false;
          this.recipeRegistry.set(this.recipe.id, this.recipe);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem unfollowing recipe');
    }
  };
}
