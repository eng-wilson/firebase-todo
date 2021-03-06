// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';

const tron = Reactotron.configure()
  .useReactNative()
  .connect();

tron.clear();

console.tron = tron;

export default tron;
