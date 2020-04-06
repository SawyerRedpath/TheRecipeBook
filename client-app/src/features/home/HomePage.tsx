import React, { useContext } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <>
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src="/assets/logo-white.png"
              alt="logo"
              style={{ marginBottom: 12 }}
            />
            The Recipe Book
          </Header>
          {isLoggedIn && user ? (
            <>
              <Header
                as="h2"
                inverted
                content={`Welcome back ${user.displayName}`}
              />
              <Button as={Link} to="/recipes" size="huge" inverted>
                Go to Recipes
              </Button>
            </>
          ) : (
            <>
              <Header as="h2" inverted content="Welcome to The Recipe Book" />
              <Button
                onClick={() => openModal(<LoginForm />)}
                to="/login"
                size="huge"
                inverted
              >
                Login
              </Button>
              <Button
                onClick={() => openModal(<RegisterForm />)}
                size="huge"
                inverted
              >
                Register
              </Button>
            </>
          )}
        </Container>
      </Segment>
    </>
  );
};

export default HomePage;
