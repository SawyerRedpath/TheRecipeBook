import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";
import { v4 as uuid } from "uuid";
import RecipeStore from "../../../app/stores/recipeStore";
import { observer } from "mobx-react-lite";

interface IProps {
  recipe: IRecipe;
}

const RecipeForm: React.FC<IProps> = ({ recipe: initialFormState }) => {
  const recipeStore = useContext(RecipeStore);
  const { createRecipe, editRecipe, submitting, cancelFormOpen } = recipeStore;
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        source: "",
        url: "",
        notes: "",
        prepTime: "",
        cookTime: ""
      };
    }
  };

  const [recipe, setRecipe] = useState<IRecipe>(initializeForm);

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
      createRecipe(newRecipe);
    } else {
      editRecipe(recipe);
    }
  };

  return (
    <>
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
            onClick={cancelFormOpen}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    </>
  );
};

export default observer(RecipeForm);
