import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IRecipe } from "../../../app/models/recipe";
import { v4 as uuid } from "uuid";
import RecipeStore from "../../../app/stores/recipeStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { publicOrPrivate } from "../../../app/common/options/publicOrPrivateOptions";

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

  // const handleSubmit = () => {
  //   if (recipe.id.length === 0) {
  //     let newRecipe = {
  //       ...recipe,
  //       id: uuid()
  //     };
  //     createRecipe(newRecipe).then(() =>
  //       history.push(`/recipes/${newRecipe.id}`)
  //     );
  //   } else {
  //     editRecipe(recipe).then(() => history.push(`/recipes/${recipe.id}`));
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={recipe.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={recipe.description}
                  component={TextAreaInput}
                />
                <Field
                  name="source"
                  placeholder="Source"
                  value={recipe.source}
                  component={TextInput}
                />
                <Field
                  name="url"
                  placeholder="URL or Page #"
                  value={recipe.url}
                  component={TextInput}
                />
                <Field
                  name="notes"
                  placeholder="Notes"
                  value={recipe.notes}
                  component={TextInput}
                />
                <Field
                  name="prepTime"
                  placeholder="Prep time"
                  value={recipe.prepTime}
                  component={TextInput}
                />
                <Field
                  name="cookTime"
                  placeholder="Cook time"
                  value={recipe.cookTime}
                  component={TextInput}
                />
                <Field
                  name="isPrivate"
                  options={publicOrPrivate}
                  placeholder="Public or Private Recipe"
                  component={SelectInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(RecipeForm);
