import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import RecipeStore from "../../../app/stores/recipeStore";
import { observer } from "mobx-react-lite";

const RecipeDetails: React.FC = () => {
  const recipeStore = useContext(RecipeStore);
  const {
    selectedRecipe: recipe,
    openEditForm,
    cancelSelectedRecipe
  } = recipeStore;
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{recipe!.title}</Card.Header>
        <Card.Meta>
          <span>{recipe!.source}</span>
          <span>{recipe!.url}</span>
        </Card.Meta>
        <Card.Description>
          <div>{recipe!.description}</div>
          <div>{recipe!.notes}</div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(recipe!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedRecipe}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(RecipeDetails);
