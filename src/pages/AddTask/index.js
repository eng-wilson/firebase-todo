import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import Input from '../../components/Input';
// Utils
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container, Label, ButtonsContainer, ActionButton, ButtonTitle,
} from './styles';

const AddTask = ({ navigation }) => {
  const formRef = useRef(null);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    console.tron.log(currentDate);
  };

  const getTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      return [];
    }
  };

  function getFormattedDate() {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  async function handleSubmit(data) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Título obrigatório'),
        description: Yup.string().required('Descrição obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const storagedTasks = await getTasks();

      await AsyncStorage.setItem('@tasks', JSON.stringify([...storagedTasks, { title: data.title, description: data.description, date: getFormattedDate() }]));

      Alert.alert('Sucesso ✅', 'Tarefa adicionada à lista');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }

  return (
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
        />

        <ButtonsContainer>
          <ActionButton action="back" onPress={() => navigation.goBack()}>
            <ButtonTitle>Voltar</ButtonTitle>
          </ActionButton>

          <ActionButton action="forward" onPress={() => formRef.current.submitForm()}>
            <ButtonTitle>Salvar</ButtonTitle>
          </ActionButton>
        </ButtonsContainer>

      </Form>
    </Container>
  );
};

export default AddTask;
