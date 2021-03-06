import React, { useRef } from 'react';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';

import {
  Container, Label, Title, ActionButton, CreateAccountButton, CreateAccountButtonText,
} from './styles';

const SignIn = () => {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      console.tron.log(data);
    } catch (e) {
      // saving error
    }
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>E-mail</Label>
        <Input name="email" />

        <Label>Senha</Label>
        <Input autoCorrect={false} secureTextEntry name="password" />

        <ActionButton>
          <Title>Entrar</Title>
        </ActionButton>
      </Form>

      <CreateAccountButton>
        <CreateAccountButtonText>Cadastrar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </Container>
  );
};

export default SignIn;
