import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { RecipeFormValues } from '../../../app/models/recipe';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { publicOrPrivate } from '../../../app/common/options/publicOrPrivateOptions';
import { v4 as uuid } from 'uuid';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  title: isRequired({ message: 'The recipe title is required' }),
  description: isRequired({ message: 'The recipe description is required' }),
  source: isRequired({ message: 'The recipe source is required' }),
  cookTime: isRequired({ message: 'The recipe cook time is required' }),
  prepTime: isRequired({ message: 'The recipe prep time is required' }),
  isPrivate: isRequired({ message: 'The recipe privacy level is required' }),
});

interface DetailParams {
  id: string;
}

const RecipeForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createRecipe,
    editRecipe,
    submitting,
    loadRecipe,
  } = rootStore.recipeStore;

  const [recipe, setRecipe] = useState(new RecipeFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadRecipe(match.params.id)
        .then((recipe) => setRecipe(new RecipeFormValues(recipe)))
        .finally(() => setLoading(false));
    }
  }, [loadRecipe, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...recipe } = values;
    if (!recipe.id) {
      let newRecipe = {
        ...recipe,
        id: uuid(),
      };
      createRecipe(newRecipe);
    } else {
      editRecipe(recipe);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={recipe}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>Title</label>
                  <Field
                    name="title"
                    placeholder="Delicious Mexican Salad"
                    value={recipe.title}
                    component={TextInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>Description</label>
                  <Field
                    name="description"
                    placeholder="A very yummy salad good for..."
                    rows={3}
                    value={recipe.description}
                    component={TextAreaInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>Recipe Source</label>
                  <Field
                    name="source"
                    placeholder="Martha Stewart Cook Book"
                    value={recipe.source}
                    component={TextInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>
                    URL to Recipe (optional)
                  </label>
                  <Field
                    name="url"
                    placeholder="http://www.goodeatsdaily.com/mexicansalad"
                    value={recipe.url}
                    component={TextInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>
                    Notes (optional)
                  </label>
                  <Field
                    name="notes"
                    placeholder="Add more dressing than called for"
                    value={recipe.notes}
                    component={TextInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>Prep Time</label>
                  <Field
                    name="prepTime"
                    placeholder="30 minutes"
                    value={recipe.prepTime}
                    component={TextInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>Cook Time</label>
                  <Field
                    name="cookTime"
                    placeholder="5 minutes"
                    value={recipe.cookTime}
                    component={TextInput}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ marginLeft: '0.7rem' }}>Privacy Level</label>
                  <Field
                    name="isPrivate"
                    options={publicOrPrivate}
                    value={recipe.isPrivate}
                    placeholder="Public or Private Recipe"
                    component={SelectInput}
                  />
                </Form.Field>
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    recipe.id
                      ? () => history.push(`/recipes/${recipe.id}`)
                      : () => history.push('/recipes')
                  }
                  disabled={loading}
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
