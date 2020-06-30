import React, { useContext } from 'react';
import { Segment, Item, Header, Image, Button } from 'semantic-ui-react';
import { IRecipe } from '../../../app/models/recipe';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

const recipeImageStyle = {
  filter: 'brightness(30%)',
};

const recipeImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const RecipeDetailedHeader: React.FC<{ recipe: IRecipe }> = ({ recipe }) => {
  const creator = recipe.followers.filter((x) => x.isCreator)[0];
  const rootStore = useContext(RootStoreContext);
  const { followRecipe, unfollowRecipe, loading } = rootStore.recipeStore;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/recipe-placeholder.jpeg`}
          fluid
          style={recipeImageStyle}
        />
        <Segment basic style={recipeImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={recipe.title}
                  style={{ color: 'white' }}
                />
                <p>{recipe.source}</p>
                <p>
                  Shared by <strong>{creator.displayName}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {recipe.isCreator ? (
          <Button as={Link} to={`/manage/${recipe.id}`} color="orange">
            Edit Recipe
          </Button>
        ) : recipe.isFollowing ? (
          <Button loading={loading} color="yellow" onClick={unfollowRecipe}>
            Unfollow Recipe
          </Button>
        ) : (
          <Button loading={loading} color="blue" onClick={followRecipe}>
            Follow Recipe
          </Button>
        )}

        <Button as={Link} to={'/recipes'}>
          Cancel
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(RecipeDetailedHeader);
