import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { AuthStack } from '../../navigation/AuthStack';
import { MainStack } from '../../navigation/MainStack';
import { View } from 'react-native';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <View style={{ flex: 1 }}>
      {data.isLoggedIn ? (
        <View
          style={{
            flex: 1,
          }}>
          <MainStack />
        </View>
      ) : null}
      {!data.isLoggedIn ? (
        <View
          style={{
            flex: 1,
          }}>
          <AuthStack />
        </View>
      ) : null}
    </View>
  );
};

export default IsLoggedIn;
