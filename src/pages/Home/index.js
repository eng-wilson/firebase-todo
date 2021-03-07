import React, { useEffect, useState } from 'react';
import { ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Calendar from '../../assets/calendar.png';

import {
  Container,
  ItemContainer,
  ItemTitle,
  ItemDescription,
  TitleContainer,
  MainTitle,
  ActionButton,
  ButtonTitle,
  RowContainer,
  DateText,
} from './styles';

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');

      console.tron.log(JSON.parse(jsonValue));

      if (jsonValue !== null) {
        setTasks(JSON.parse(jsonValue));
      } else {
        setTasks([]);
      }
    } catch (e) {
      console.tron.log(e);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTasks();
    });
  }, []);

  return (
    <Container>

      <TitleContainer>
        <MainTitle>Minhas tarefas</MainTitle>

        <ActionButton onPress={() => navigation.navigate('AddTask')}>
          <ButtonTitle>Adicionar</ButtonTitle>
        </ActionButton>
      </TitleContainer>

      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ItemContainer>
            <ItemTitle>{task.title}</ItemTitle>

            <ItemDescription numberOfLines={2}>{task.description}</ItemDescription>

            <RowContainer>
              <Image source={Calendar} style={{ height: 18, width: 21 }} />

              <DateText>8 de março de 2021</DateText>
            </RowContainer>
          </ItemContainer>
        ))}

      </ScrollView>
    </Container>
  );
};

export default Home;
