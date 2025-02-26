import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import AuthInitial from '../screens/AuthInitial/AuthInitial';
import AuthVerify from '../screens/AuthVerify/AuthVerify';
export type AuthParamList = {
  'Auth/Initial': undefined;
  'Auth/Verify': {
    email: string;
  };
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = () => {
  return (
    <View
      style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth/Initial"
          component={AuthInitial}
          options={{ headerShown: false, animation: 'none' }}
        />
        <Stack.Screen
          name="Auth/Verify"
          component={AuthVerify}
          options={{
            headerShown: false,
            presentation: 'formSheet',
          }}
        />
      </Stack.Navigator>
    </View>
  );
};
