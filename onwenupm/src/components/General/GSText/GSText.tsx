import { Text, StyleSheet, TextProps } from 'react-native';
import React from 'react';
import { Fonts } from '../../../config/fonts/Fonts';
import { Theme } from '../../../config/theme/Theme.interface';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { TextWeight } from '../../../types';

export interface PropText extends TextProps {
  /**
   * Sets font color of text. Default is based on system appearance (undefined / null).
   */
  color?: string | undefined | null;

  /**
   * Set font size of text. Default is 14 (undefined / null).
   */
  size?: number | undefined | null;

  /**
   * Set font weight of text. Default is "regular" (undefined / null).
   */
  weight?: TextWeight | undefined | null;

  preset?: 'heading' | 'subheading' | 'subheading-alt';
}

export const GSText = React.memo<PropText>(
  ({
    color,
    size,
    weight,
    style,
    children,
    preset,
    numberOfLines,
    ellipsizeMode,
    accessibilityRole,
    allowFontScaling,
    maxFontSizeMultiplier,
  }) => {
    const createStyles = (theme: Theme) => {
      return StyleSheet.create({
        text: {
          fontFamily:
            Fonts[
            preset == 'heading' || preset == 'subheading'
              ? 'bold'
              : weight == null
                ? 'medium'
                : weight
            ],
          color: color == null ? theme.color.textColor : color,
          fontSize:
            preset == 'heading' && size == null
              ? 20
              : preset == 'subheading' && size == null
                ? 16
                : size == null
                  ? 14
                  : size,
          opacity: preset == 'subheading' ? 0.7 : 1,
        },
      });
    };

    const Styles = useThemeAwareObject(createStyles);

    return (
      <Text
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        accessibilityRole={
          preset == 'heading' || preset == 'subheading'
            ? 'header'
            : accessibilityRole
        }
        allowFontScaling={allowFontScaling}
        maxFontSizeMultiplier={
          maxFontSizeMultiplier ? maxFontSizeMultiplier : 1.5
        }
        style={[Styles.text, style]}>
        {children}
      </Text>
    );
  },
);
