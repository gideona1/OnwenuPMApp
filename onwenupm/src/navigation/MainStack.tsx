import React, { useEffect, useRef } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBellConcierge,
  faBox,
  faCalendar,
  faCircleUser,
  faDollarSign,
  faGripHorizontal,
  faHome,
  faLink,
  faMagnifyingGlass,
  faPlus,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../config/theme/Theme.context';
import { Fonts } from '../config/fonts/Fonts';
import { Alert, Linking, Settings, View } from 'react-native';
import { GSText, GSTopHeader } from '../components/General';
import Home from '../screens/Home/Home';
import Pay from '../screens/Pay/Pay';
import Profile from '../screens/Profile/Profile';
import { QueryVerifyUser } from '../services/queries';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const { theme } = useTheme();

  QueryVerifyUser();

  const PlaceholderComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <GSTopHeader>Blank Page</GSTopHeader>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.color.bgColor,
          }}>
          <GSText>Nothing to see here yet. :)</GSText>
        </View>
      </View>
    );
  };

  const TabComponents = () => {
    return (
      <Tab.Navigator
        initialRouteName="Explore"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // console.log();
            switch (route.name) {
              case 'Explore':
                return (
                  <FontAwesomeIcon icon={faGripHorizontal} size={20} color={color} />
                );

              case 'Calendar':
                return (
                  <FontAwesomeIcon icon={faCalendar} size={20} color={color} />
                );

              case 'Maintenance':
                return (
                  <FontAwesomeIcon icon={faToolbox} size={20} color={color} />
                );

              case 'Pay':
                return (
                  <FontAwesomeIcon icon={faDollarSign} size={20} color={color} />
                );

              case 'Tenants':
                return (
                  <FontAwesomeIcon icon={faCircleUser} size={20} color={color} />
                );
            }
          },

          tabBarActiveTintColor: theme.color.accentP,
          tabBarInactiveTintColor: theme.color.olColor,
          tabBarAllowFontScaling: false,
          tabBarLabelStyle: {
            fontFamily: Fonts['regular'],
            fontSize: 11,
          },
          // tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.color.bgColor,
            borderTopWidth: 1,
            borderTopColor: theme.color.olColor,
          },
        })}>
        <Tab.Screen
          name="Explore"
          component={Home}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Calendar"
          component={PlaceholderComponent}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Pay"
          component={Pay}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Maintenance"
          component={PlaceholderComponent}
          options={{ headerShown: false }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              Linking.openURL('https://forms.monday.com/forms/49f43bc32705ae64c72eeb9c552dbe26?r=use1');
            },
          }}
        />

        <Tab.Screen
          name="Tenants"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <View
      style={{ flex: 1, transform: [{ scale: 1 }] }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main/Main"
          component={TabComponents}
          options={{ headerShown: false, animation: 'none' }}
        />
      </Stack.Navigator>
    </View>
  );
};
