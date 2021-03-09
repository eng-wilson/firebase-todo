import React, { useRef, useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Platform } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

import Input from '../../components/Input';
// Utils
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Label, ButtonsContainer, ActionButton, ButtonTitle, DateContainer,
} from './styles';

const TaskDetails = ({ route, navigation }) => {
  const task = route.params;
  const formRef = useRef(null);
  const [fetching, setFetching] = useState(false);
  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date(task.data.date._seconds * 1000));

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios');
  };

  async function handleSubmit(data) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Título obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      setFetching(true);

      await firestore()
        .collection('tasks')
        .doc(task.id)
        .update({
          title: data.title,
          description: data.description,
          date: firestore.Timestamp.fromDate(date),
        });

      setFetching(false);

      Alert.alert('Sucesso ✅', 'Tarefa atualizada');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      setFetching(false);
    }
  }

  async function handleDelete() {
    try {
      setFetching(true);

      await firestore()
        .collection('tasks')
        .doc(task.id)
        .delete();

      setFetching(false);

      navigation.goBack();

      Alert.alert('Sucesso ✅', 'Tarefa excluída');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível deletar a tarefa nesse momento');
    }
  }

  useEffect(() => {
    formRef.current.setData({ title: task.data.title, description: task.data.description });

    setShow(Platform.OS === 'ios');
  }, []);

  return fetching ? <ActivityIndicator style={{ flex: 1 }} /> : (
    <Container>
      <ActionButton action="delete" onPress={() => handleDelete()}>
        <ButtonTitle>Excluir</ButtonTitle>
      </ActionButton>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>Título</Label>
        <Input name="title" />

        <Label>Descrição</Label>
        <Input name="description" multiline />

        <Label>Data</Label>

        {Platform.OS !== 'ios' && (
        <DateContainer onPress={() => setShow(true)}>
          <Label>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Label>
        </DateContainer>
        )}

        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          locale="pt-BR"
        />
        )}

        <ButtonsContainer>
          <ActionButton action="back" onPress={() => navigation.goBack()}>
            <ButtonTitle>Voltar</ButtonTitle>
          </ActionButton>

          <ActionButton onPress={() => formRef.current.submitForm()}>
            <ButtonTitle>Salvar</ButtonTitle>
          </ActionButton>
        </ButtonsContainer>

      </Form>

    </Container>
  );
};

export default TaskDetails;
