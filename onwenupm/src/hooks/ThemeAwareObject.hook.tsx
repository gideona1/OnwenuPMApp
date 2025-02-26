import React from 'react';
import {useTheme} from '../config/theme/Theme.context';
import {Theme} from '../config/theme/Theme.interface';

type Generator<T extends {}> = (theme: Theme) => T;

const useThemeAwareObject = <T extends {}>(fn: Generator<T>) => {
  const {theme} = useTheme();

  const ThemeAwareObject = React.useMemo(() => fn(theme), [fn, theme]);
  return ThemeAwareObject;
};
export {useThemeAwareObject};
