import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
// import IsLoggedIn from '../services/authentication/AuthIsLoggedIn';
import { useTheme } from '../config/theme/Theme.context';
import { MainStack } from './MainStack';
import { AuthStack } from './AuthStack';
import IsLoggedIn from '../services/authentication/AuthIsLoggedIn';

const Routes = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar animated={true} showHideTransition="slide" />
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            border: theme.color.olColor,
            card: theme.color.bgColor,
            notification: theme.color.bgColorS,
            primary: theme.color.accentP,
            text: theme.color.textColor,
            background: theme.color.bgSplash,
          },
        }}>
        <IsLoggedIn />
        {/* <MainStack /> */}
        {/* <AuthStack /> */}
      </NavigationContainer>
    </>
  );
};

export default Routes;
