import {View, Appearance} from 'react-native';
import React, {useEffect} from 'react';

import {ThemeProvider, useTheme} from '../../config/theme/Theme.context';

import {DEFAULT_DARK_THEME} from '../../config/theme/Dark.theme';
import {DEFAULT_LIGHT_THEME} from '../../config/theme/Light.theme';

export interface Props {
  children?: React.ReactNode;
}

const SetTheme: React.FC<Props> = ({children}) => {
  const {theme, setTheme, toggleTheme} = useTheme();

  useEffect(() => {
    const appearanceListener = Appearance.addChangeListener(() => {
      const theme =
        Appearance.getColorScheme() === 'dark'
          ? DEFAULT_DARK_THEME
          : DEFAULT_LIGHT_THEME;
      setTheme(theme);
    });
    return () => {
      appearanceListener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.color.bgColor}}>
      {children}
    </View>
  );
};

export default SetTheme;
