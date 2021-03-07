import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  padding: 20px;

  background-color: #fff;
`;

export const ItemContainer = styled.View`
  height: 110px;
  width: 100%;

  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ItemTitle = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: 600;
`;

export const ItemDescription = styled.Text`
  color: #9BA5B4;
  font-size: 14px;
  font-weight: 400;

  padding: 5px 0px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin: 20px 0px;
`;

export const MainTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export const ActionButton = styled.TouchableOpacity`
  height: 40px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  padding: 0px 20px;
  

  background-color: #01B399;
`;
