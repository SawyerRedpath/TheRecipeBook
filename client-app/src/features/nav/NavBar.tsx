import React, { useContext } from 'react';
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo-grey.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          The Recipe Book
        </Menu.Item>
        <Menu.Item name="Recipes" as={NavLink} to="/recipes" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createRecipe"
            positive
            content="Add New Recipe"
          />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || '/assets/user.png'}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My Profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Log out" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
