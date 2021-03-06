import React, { useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Form } from '@unform/mobile';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';

import AuthActions from '../../redux/AuthRedux';

import {
  Container, Label, Title, ActionButton, BottomButton, BottomButtonText, StrongTitle,
} from './styles';

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [fetching, setFetching] = useState(false);

  function handleSubmit(data) {
    try {
      setFetching(true);

      dispatch(AuthActions.signUpRequest(data.email, data.password));

      setFetching(false);
    } catch (e) {
      setFetching(false);
    }
  }

  return fetching ? <ActivityIndicator style={{ flex: 1 }} /> : (
    <Container>
      <StrongTitle>Cadastro</StrongTitle>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>E-mail</Label>
        <Input autoCapitalize="none" autoCorrect={false} name="email" />

        <Label>Senha</Label>
        <Input secureTextEntry name="password" />

        <ActionButton onPress={() => formRef.current.submitForm()}>
          <Title>Cadastrar</Title>
        </ActionButton>
      </Form>

      <BottomButton onPress={() => navigation.navigate('SignIn')}>
        <BottomButtonText>Voltar para tela de Login</BottomButtonText>
      </BottomButton>
    </Container>
  );
};

export default SignUp;
