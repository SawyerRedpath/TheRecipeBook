import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import RecipeStore from "../../../app/stores/recipeStore";
import RecipeListItem from "./RecipeListItem";

const RecipeList: React.FC = () => {
  const recipeStore = useContext(RecipeStore);
  const { recipesByTitle } = recipeStore;
  return (
    <Item.Group divided>
      {recipesByTitle.map(recipe => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </Item.Group>
  );
};

export default observer(RecipeList);
