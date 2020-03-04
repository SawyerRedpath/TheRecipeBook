import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";
import RecipeList from "../dashboard/RecipeList";
import { RecipeDetails } from "../details/RecipeDetails";
import { RecipeForm } from "../form/RecipeForm";

interface IProps {
  recipes: IRecipe[];
  selectRecipe: (id: string) => void;
  selectedRecipe: IRecipe | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedRecipe: (recipe: IRecipe | null) => void;
  createRecipe: (recipe: IRecipe) => void;
  editRecipe: (recipe: IRecipe) => void;
  deleteRecipe: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const RecipeDashboard: React.FC<IProps> = ({
  recipes,
  selectRecipe,
  selectedRecipe,
  editMode,
  setEditMode,
  setSelectedRecipe,
  createRecipe,
  editRecipe,
  deleteRecipe,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <RecipeList
          recipes={recipes}
          selectRecipe={selectRecipe}
          deleteRecipe={deleteRecipe}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedRecipe && !editMode && (
          <RecipeDetails
            recipe={selectedRecipe}
            setEditMode={setEditMode}
            setSelectedRecipe={setSelectedRecipe}
          />
        )}
        {editMode && (
          <RecipeForm
            key={(selectedRecipe && selectedRecipe.id) || 0}
            setEditMode={setEditMode}
            recipe={selectedRecipe!}
            createRecipe={createRecipe}
            editRecipe={editRecipe}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
