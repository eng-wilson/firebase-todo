import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { Form } from '@unform/mobile';
import auth from '@react-native-firebase/auth';

import Input from '../../components/Input';

import {
  Container, Label, Title, ActionButton, CreateAccountButton, CreateAccountButtonText, StrongTitle,
} from './styles';

const SignIn = ({ navigation }) => {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const response = await auth().signInWithEmailAndPassword(data.email, data.password);

      console.tron.log(response);

      if (response && response.user) {
        Alert.alert('Success ✅', 'Authenticated successfully');
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
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
