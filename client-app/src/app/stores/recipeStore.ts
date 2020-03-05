import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IRecipe } from "../models/recipe";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class RecipeStore {
  @observable recipeRegistry = new Map();
  @observable recipes: IRecipe[] = [];
  @observable selectedRecipe: IRecipe | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

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
      runInAction("loading recipes", () => {
        recipes.forEach(recipe => {
          this.recipeRegistry.set(recipe.id, recipe);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading recipes error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createRecipe = async (recipe: IRecipe) => {
    this.submitting = true;
    try {
      await agent.Recipes.create(recipe);
      runInAction("creating recipe", () => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("creating recipe error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editRecipe = async (recipe: IRecipe) => {
    this.submitting = true;
    try {
      await agent.Recipes.update(recipe);
      runInAction("editing recipe", () => {
        this.recipeRegistry.set(recipe.id, recipe);
        this.selectedRecipe = recipe;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing recipe error", () => {
        this.submitting = false;
      });

      console.log(error);
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
      runInAction("deleting recipe", () => {
        this.recipeRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("deleting recipe error", () => {
        this.submitting = false;
        this.target = "";
      });

      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedRecipe = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedRecipe = this.recipeRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedRecipe = () => {
    this.selectedRecipe = undefined;
  };

  @action selectRecipe = (id: string) => {
    this.selectedRecipe = this.recipeRegistry.get(id);
    this.editMode = false;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}

export default createContext(new RecipeStore());
