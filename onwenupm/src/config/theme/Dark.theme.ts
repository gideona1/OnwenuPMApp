import {ColorTheme, SpacingTheme, Theme} from './Theme.interface';

const DEFAULT_DARK_COLOR_THEME: ColorTheme = {
  accentP: '#cf0037',
  accentS: '#5b0018',
  textColor: '#dfe6e9',
  bgColor: '#050505',
  bgColorS: '#0f0f0f',
  bgSplash: '#000000',
  olColor: '#1a1a1a',
};

const DEFAULT_DARK_SPACING_THEME: SpacingTheme = {
  base: 14,
  double: 18,
  radius: 4,
  separator: 10,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME: Theme = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  spacing: DEFAULT_DARK_SPACING_THEME,
};
