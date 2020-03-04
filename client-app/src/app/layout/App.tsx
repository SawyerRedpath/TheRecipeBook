import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IRecipe } from "../models/recipe";
import { NavBar } from "../../features/nav/NavBar";
import { RecipeDashboard } from "../../features/recipes/dashboard/RecipeDashboard";

const App = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipe(recipes.filter(r => r.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedRecipe(null);
    setEditMode(true);
  };

  const handleCreateRecipe = (recipe: IRecipe) => {
    setRecipes([...recipes, recipe]);
    // Set current selected recipe to added recipe so user can view
    setSelectedRecipe(recipe);
    // Set edit mode false to hide form
    setEditMode(false);
  };

  const handleEditRecipe = (recipe: IRecipe) => {
    setRecipes([...recipes.filter(r => r.id !== recipe.id), recipe]);
    setSelectedRecipe(recipe);
    setEditMode(false);
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes([...recipes.filter(r => r.id !== id)]);
  };

  useEffect(() => {
    axios.get<IRecipe[]>("http://localhost:5000/api/recipes").then(response => {
      setRecipes(response.data);
    });
  }, []);

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
        />
      </Container>
    </>
  );
};

export default App;
