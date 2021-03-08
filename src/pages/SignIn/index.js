import React, { useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';

import AuthActions from '../../redux/AuthRedux';

import {
  Container, Label, Title, ActionButton, CreateAccountButton, CreateAccountButtonText, StrongTitle,
} from './styles';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [fetching, setFetching] = useState(false);

  async function handleSubmit(data) {
    try {
      setFetching(true);

      await dispatch(AuthActions.authRequest(data.email, data.password));

      setFetching(false);
    } catch (e) {
      setFetching(false);
    }
  }

  return fetching ? <ActivityIndicator style={{ flex: 1 }} /> : (
    <Container>
      <StrongTitle>Login</StrongTitle>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>E-mail</Label>
        <Input autoCapitalize="none" autoCorrect={false} name="email" />

        <Label>Senha</Label>
        <Input secureTextEntry name="password" />

        <ActionButton onPress={() => formRef.current.submitForm()}>
          <Title>Entrar</Title>
        </ActionButton>
      </Form>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <CreateAccountButtonText>Cadastrar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </Container>
  );
};

export default SignIn;
