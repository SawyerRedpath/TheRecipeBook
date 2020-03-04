import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IRecipe } from "../models/recipe";
import { NavBar } from "../../features/nav/NavBar";
import { RecipeDashboard } from "../../features/recipes/dashboard/RecipeDashboard";
import { LoadingComponent } from "../layout/LoadingComponent";
import agent from "../api/agent";

const App = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipe(recipes.filter(r => r.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedRecipe(null);
    setEditMode(true);
  };

  const handleCreateRecipe = (recipe: IRecipe) => {
    setSubmitting(true);
    agent.Recipes.create(recipe)
      .then(() => {
        setRecipes([...recipes, recipe]);
        // Set current selected recipe to added recipe so user can view
        setSelectedRecipe(recipe);
        // Set edit mode false to hide form
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditRecipe = (recipe: IRecipe) => {
    setSubmitting(true);
    agent.Recipes.update(recipe)
      .then(() => {
        setRecipes([...recipes.filter(r => r.id !== recipe.id), recipe]);
        setSelectedRecipe(recipe);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteRecipe = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Recipes.delete(id)
      .then(() => {
        setRecipes([...recipes.filter(r => r.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Recipes.list()
      .then(response => {
        setRecipes(response);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading recipes.." />;

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <RecipeDashboard
          recipes={recipes}
          selectRecipe={handleSelectRecipe}
          selectedRecipe={selectedRecipe}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedRecipe={setSelectedRecipe}
          createRecipe={handleCreateRecipe}
          editRecipe={handleEditRecipe}
          deleteRecipe={handleDeleteRecipe}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

export default App;
