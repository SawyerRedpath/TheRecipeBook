import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";
import { v4 as uuid } from "uuid";
import RecipeStore from "../../../app/stores/recipeStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const RecipeForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const recipeStore = useContext(RecipeStore);
  const {
    createRecipe,
    editRecipe,
    submitting,
    recipe: initialFormState,
    loadRecipe,
    clearRecipe
  } = recipeStore;

  const [recipe, setRecipe] = useState<IRecipe>({
    id: "",
    title: "",
    description: "",
    source: "",
    url: "",
    notes: "",
    prepTime: "",
    cookTime: ""
  });

  useEffect(() => {
    if (match.params.id && recipe.id.length === 0) {
      loadRecipe(match.params.id).then(
        () => initialFormState && setRecipe(initialFormState)
      );
    }
    // Clean up (component unmount)
    return () => {
      clearRecipe();
    };
  }, [
    loadRecipe,
    clearRecipe,
    match.params.id,
    initialFormState,
    recipe.id.length
  ]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = () => {
    if (recipe.id.length === 0) {
      let newRecipe = {
        ...recipe,
        id: uuid()
      };
      createRecipe(newRecipe).then(() =>
        history.push(`/recipes/${newRecipe.id}`)
      );
    } else {
      editRecipe(recipe).then(() => history.push(`/recipes/${recipe.id}`));
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={recipe.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Description"
              value={recipe.description}
            />
            <Form.Input
              onChange={handleInputChange}
              name="source"
              placeholder="Source"
              value={recipe.source}
            />
            <Form.Input
              onChange={handleInputChange}
              name="url"
              placeholder="URL"
              value={recipe.url}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name="notes"
              placeholder="Notes"
              value={recipe.notes}
            />
            <Form.Input
              onChange={handleInputChange}
              name="prepTime"
              placeholder="Prep time"
              value={recipe.prepTime}
            />
            <Form.Input
              onChange={handleInputChange}
              name="cookTime"
              placeholder="Cook time"
              value={recipe.cookTime}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/recipes")}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(RecipeForm);
