import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import AuthActions from '../../redux/AuthRedux';

import { Container, Title } from './styles';

const Header = () => {
  const dispatch = useDispatch();

  function handleLogout() {
    try {
      dispatch(AuthActions.logoutRequest());
    } catch (e) {
      console.tron.log(e);
    }
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Title>Logout</Title>
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
