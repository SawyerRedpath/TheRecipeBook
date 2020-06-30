import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import RecipeDetailedHeader from './RecipeDetailedHeader';
import RecipeDetailedInfo from './RecipeDetailedInfo';
import RecipeDetailedChat from './RecipeDetailedChat';
import RecipeDetailedSidebar from './RecipeDetailedSidebar';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const RecipeDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { recipe, loadRecipe, loadingInitial } = rootStore.recipeStore;

  useEffect(() => {
    loadRecipe(match.params.id);
  }, [loadRecipe, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading recipe" />;

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <RecipeDetailedHeader recipe={recipe} />
        <RecipeDetailedInfo recipe={recipe} />
        <RecipeDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <RecipeDetailedSidebar followers={recipe.followers} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(RecipeDetails);
