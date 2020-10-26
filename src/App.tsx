import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from './components/Login/LoginForm';
import SurveyForm from './components/Survey/SurveyForm/SurveyForm';
import Survey from './components/Survey/Survey';
import AppContext from './context/app.context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState('');

  useEffect(() => {

  }, []);


  const renderSurveyComponent = () => {
    return (
      <Survey />
    )
  }

  const renderLogin = () => {
    return (
      <Row>
        <Col>
          <h2>Please login to continue</h2>
          <hr />
          <LoginForm setIsLoggedIn={setIsLoggedIn} setAuth={setAuth} />
        </Col>
      </Row>
    )
  }

  const renderHeader = () => {
    return (
      <Row>
        <Col>
          <h1>Welcome to Survey App!</h1>
          <hr />
        </Col>
      </Row>
    )
  }
  return (
    <AppContext.Provider value={auth}>
      <Container>
        {renderHeader()}
        {!auth ? renderLogin() : renderSurveyComponent()}
      </Container>
    </AppContext.Provider>
  );
}

export default App;
// export default withAuthenticator(App);