import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import RecipeStore from "../../../app/stores/recipeStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const RecipeDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const recipeStore = useContext(RecipeStore);
  const { recipe, loadRecipe, loadingInitial } = recipeStore;

  useEffect(() => {
    loadRecipe(match.params.id);
  }, [loadRecipe, match.params.id]);

  if (loadingInitial || !recipe)
    return <LoadingComponent content="Loading recipe" />;

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
            as={Link}
            to={`/manage/${recipe.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/recipes")}
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
