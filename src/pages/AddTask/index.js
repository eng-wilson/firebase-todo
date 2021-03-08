import React, { useRef, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
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

const AddTask = ({ navigation }) => {
  const formRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [fetching, setFetching] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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

      firestore()
        .collection('tasks')
        .add({
          title: data.title,
          description: data.description,
          date: firestore.Timestamp.fromDate(date),
        });

      setFetching(false);

      Alert.alert('Sucesso ✅', 'Tarefa adicionada à lista');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      setFetching(false);
    }
  }

  return fetching ? <ActivityIndicator style={{ flex: 1 }} /> : (
    <Container>
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

export default AddTask;
