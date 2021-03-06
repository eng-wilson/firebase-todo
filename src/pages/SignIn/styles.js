import styled from 'styled-components/native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  background-color: #fff;

  padding: 20px;
`;

export const Label = styled.Text`
  color: #333;
  text-align: left;
  font-size: 14px;
  padding-bottom: 4px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  padding: 0px 20px;
  margin: 20px 0px;

  background-color: #01B399;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 30px ${16 + getBottomSpace()}px;

  flex-direction: row;

  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #FF807B;
  font-size: 18px;
  font-weight: 600;
`;
