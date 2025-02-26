import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthParamList} from '../AuthStack';

export type AuthScreenProp = NativeStackNavigationProp<
  AuthParamList,
  'Auth/Initial'
>;
