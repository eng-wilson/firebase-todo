import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;

  padding: 20px;
`;

export const Label = styled.Text`
  color: #333;
  text-align: left;
  font-size: 14px;
  padding-bottom: 4px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: 20px;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 40%;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  padding: 0px 20px;

  height: 40px;
  ${(props) => {
    switch (props.action) {
      case 'back':
        return css`
          background-color: #FF807B;
        `;

      default:
        return css`
          background-color: #01B399;
        `;
    }
  }}
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;
