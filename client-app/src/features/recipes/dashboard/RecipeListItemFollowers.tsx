import React from 'react';
import { List, Image, Popup } from 'semantic-ui-react';
import { IFollower } from '../../../app/models/recipe';

interface IProps {
  followers: IFollower[];
}

const RecipeListItemFollowers: React.FC<IProps> = ({ followers }) => {
  return (
    <List horizontal>
      {followers.map((follower) => (
        <List.Item key={follower.username}>
          <Popup
            header={follower.displayName}
            trigger={
              <Image
                size="mini"
                circular
                src={follower.image || '/assets/user.png'}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default RecipeListItemFollowers;
