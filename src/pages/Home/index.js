import React, { useEffect } from 'react';
import { ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from '../../assets/calendar.png';

import TasksActions from '../../redux/TasksRedux';

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
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  function getTasks() {
    try {
      dispatch(TasksActions.tasksRequest());
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
          <ItemContainer key={tasks.indexOf(task)}>
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
