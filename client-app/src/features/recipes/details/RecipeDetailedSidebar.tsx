import React from 'react';
import { Segment, Image, Item, List, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IFollower } from '../../../app/models/recipe';
import { observer } from 'mobx-react-lite';

interface IProps {
  followers: IFollower[];
}

const RecipeDetailedSidebar: React.FC<IProps> = ({ followers }) => {
  const isHost = false;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        {followers.length} {followers.length === 1 ? 'person' : 'people'}{' '}
        following this recipe
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {followers.map((follower) => (
            <Item key={follower.username} style={{ position: 'relative' }}>
              {isHost && (
                <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                >
                  Recipe poster
                </Label>
              )}
              <Image size="tiny" src={follower.image || '/assets/user.png'} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profile/${follower.username}`}>
                    {follower.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default observer(RecipeDetailedSidebar);
