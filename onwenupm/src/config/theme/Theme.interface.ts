export interface ColorTheme {
  accentP: string;
  accentS: string;
  textColor: string;
  bgColor: string;
  bgColorS: string;
  bgSplash: string;
  olColor: string;
}

export interface SpacingTheme {
  base: number;
  double: number;
  radius: number;
  separator: number;
}

export interface Theme {
  id: string;
  color: ColorTheme;
  spacing: SpacingTheme;
}
