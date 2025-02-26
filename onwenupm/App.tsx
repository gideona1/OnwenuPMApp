/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { GSBackButton, GSButton, GSContainer, GSInputField, GSText } from './src/components/General';
// import { Appearance } from 'react-native';
import { DEFAULT_LIGHT_THEME } from './src/config/theme/Light.theme';
import SetTheme from './src/config/theme/SetTheme';
import { ThemeProvider } from './src/config/theme/Theme.context';
import Routes from './src/navigation/Routes';
import FlashMessage from "react-native-flash-message";
import { MMKV } from "react-native-mmkv";
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, createHttpLink, from, useApolloClient } from '@apollo/client';
import { cache } from './src/config/defaults/cache';
import { onError } from "@apollo/client/link/error";
import { AuthLogout } from './src/services/authentication';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const storage = new MMKV();


const App = () => {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        if (extensions.code === 'USER_UNAUTHENTICATED') {
          AuthLogout(client);
        }
      })
    }
  });

  const httpLink = createHttpLink({
    uri: 'https://6bff-2607-fb91-1600-1d75-d074-d3e5-ade9-f04.ngrok-free.app/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = storage.getString('authAccessToken') || '';
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'Apollo-Require-Preflight': 'true'
      },
    };
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink.concat(httpLink)]),
    cache: cache
  });

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <StripeProvider
            publishableKey="pk_test_51O6lzQGdRSK3WH116pw820diHzHTAZWCMejtDNyiZICdfb8btcQzbxgaguy4cY2wkmscIRcAAcoIwd3SCiqLiX4100EQgoKFaY"
          // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
          >
            <StatusBar barStyle={'dark-content'}></StatusBar>
            <ThemeProvider
              initial={
                DEFAULT_LIGHT_THEME
              }>
              <Routes />
            </ThemeProvider>
            <FlashMessage style={{ zIndex: 9999 }} floating position="top" />
          </StripeProvider>
        </ApolloProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
