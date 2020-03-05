import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../../features/nav/NavBar";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import LoadingComponent from "../layout/LoadingComponent";

import RecipeStore from "../stores/recipeStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const recipeStore = useContext(RecipeStore);

  useEffect(() => {
    recipeStore.loadRecipes();
  }, [recipeStore]);

  if (recipeStore.loadingInitial)
    return <LoadingComponent content="Loading recipes.." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <RecipeDashboard />
      </Container>
    </>
  );
};

export default observer(App);
