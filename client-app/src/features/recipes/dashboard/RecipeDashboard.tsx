import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import RecipeList from "../dashboard/RecipeList";
import RecipeDetails from "../details/RecipeDetails";
import RecipeForm from "../form/RecipeForm";
import { observer } from "mobx-react-lite";
import RecipeStore from "../../../app/stores/recipeStore";

const RecipeDashboard: React.FC = () => {
  const recipeStore = useContext(RecipeStore);
  const { editMode, selectedRecipe } = recipeStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <RecipeList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedRecipe && !editMode && <RecipeDetails />}
        {editMode && (
          <RecipeForm
            key={(selectedRecipe && selectedRecipe.id) || 0}
            recipe={selectedRecipe!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(RecipeDashboard);
