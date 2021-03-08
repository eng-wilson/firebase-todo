import React, { useRef, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

import Input from '../../components/Input';
// Utils
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Label, ButtonsContainer, ActionButton, ButtonTitle,
} from './styles';

const TaskDetails = ({ route, navigation }) => {
  const task = route.params;
  const formRef = useRef(null);

  const [date, setDate] = useState(new Date(task.data.date._seconds * 1000));

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    console.tron.log(currentDate);
  };

  async function handleSubmit(data) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Título obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await firestore()
        .collection('tasks')
        .doc(task.id)
        .update({
          title: data.title,
          description: data.description,
          date: firestore.Timestamp.fromDate(date),
        });

      Alert.alert('Sucesso ✅', 'Tarefa adicionada à lista');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }

  useEffect(() => {
    formRef.current.setData({ title: task.data.title, description: task.data.description });
  }, []);

  return (
    <Container>
      <ActionButton action="delete" onPress={() => formRef.current.submitForm()}>
        <ButtonTitle>Excluir</ButtonTitle>
      </ActionButton>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>Título</Label>
        <Input name="title" />

        <Label>Descrição</Label>
        <Input name="description" multiline />

        <Label>Data</Label>

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          locale="pt-BR"
        />

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
