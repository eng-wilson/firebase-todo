import React, { useEffect } from 'react';
import {
  Image, FlatList, RefreshControl, Alert,
} from 'react-native';
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
  const { fetching } = useSelector((state) => state.tasks);

  function getTasks() {
    try {
      dispatch(TasksActions.tasksRequest());
    } catch (e) {
      Alert.alert('Ops', 'Não foi possível obter a lista de tarefas');
    }
  }

  function getFormattedDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function onRefresh() {
    getTasks();
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

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        refreshControl={(
          <RefreshControl
            tintColor="#ccc"
            colors={['#ccc']}
            refreshing={fetching}
            onRefresh={onRefresh}
          />
        )}
        renderItem={({ item }) => (
          <ItemContainer onPress={() => navigation.navigate('TaskDetails', item)}>
            <ItemTitle>{item.data.title}</ItemTitle>

            <ItemDescription numberOfLines={2}>{item.data.description}</ItemDescription>

            <RowContainer>
              <Image source={Calendar} style={{ height: 18, width: 21 }} />

              <DateText>{getFormattedDate(new Date(item.data.date._seconds * 1000))}</DateText>
            </RowContainer>
          </ItemContainer>
        )}
      />

    </Container>
  );
};

export default Home;
