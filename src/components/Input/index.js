/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container, TextInput, ErrorMessage } from './styles';

function Input({ name, ...rest }) {
  const {
    fieldName, registerField, defaultValue = '', error,
  } = useField(name);

  const inputElementRef = useRef(null);
  const inputValueRef = useRef({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Container isErrored={!!error}>
        <TextInput
          ref={inputElementRef}
          {...rest}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          defaultValue={defaultValue}
        />
      </Container>

    </>
  );
}

export default Input;
