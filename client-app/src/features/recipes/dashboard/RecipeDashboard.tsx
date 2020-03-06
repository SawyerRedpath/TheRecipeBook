import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import RecipeList from "../dashboard/RecipeList";
import { observer } from "mobx-react-lite";
import RecipeStore from "../../../app/stores/recipeStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const RecipeDashboard: React.FC = () => {
  const recipeStore = useContext(RecipeStore);

  useEffect(() => {
    recipeStore.loadRecipes();
  }, [recipeStore]);

  if (recipeStore.loadingInitial)
    return <LoadingComponent content="Loading recipes.." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <RecipeList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Recipe Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(RecipeDashboard);
