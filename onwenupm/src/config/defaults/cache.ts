import {InMemoryCache, Reference, makeVar} from '@apollo/client';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export const isLoggedInVar = makeVar(!!storage.getString('authAccessToken'));
