import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  
  padding: 0px 16px;
  margin-bottom: 20px;

  background: #fff;
  

  ${(props) => (props.isErrored ? css`border: 2px #ff6961;` : css`border: 2px #ddd;`)}
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
  
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 14px;
`;

export const ErrorMessage = styled.Text`
  color: #ff6961;
  text-align: left;
`;
