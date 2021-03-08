// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

const tron = Reactotron.configure()
  .useReactNative()
  .use(reactotronRedux())
  .use(reactotronSaga())
  .connect();

tron.clear();

console.tron = tron;

export default tron;
