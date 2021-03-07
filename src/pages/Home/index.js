import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  Container, ItemContainer, ItemTitle, ItemDescription, TitleContainer, MainTitle, ActionButton, ButtonTitle,
} from './styles';

const Home = () => {
  useEffect(() => {}, []);

  return (
    <Container>

      <TitleContainer>
        <MainTitle>Minhas tarefas</MainTitle>

        <ActionButton>
          <ButtonTitle>Adicionar</ButtonTitle>
        </ActionButton>
      </TitleContainer>

      <ScrollView style={{ flex: 1 }}>
        <ItemContainer>
          <ItemTitle>Fazer café</ItemTitle>

          <ItemDescription numberOfLines={2}>Limpar cafeteira, adicionar água e pó de café e esperar ficar pronto.</ItemDescription>
        </ItemContainer>
      </ScrollView>
    </Container>
  );
};

export default Home;
