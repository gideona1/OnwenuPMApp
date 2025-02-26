import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import React from 'react';

import { Theme } from '../../../config/theme/Theme.interface';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface PropContainer {
  /**
   * Set custom styling for the button.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * When set to true, SafeAreaView is used instead of normal view.
   */
  safeArea?: boolean;
  ignoreFlex?: boolean;
  children?: React.ReactNode;
}

export const GSContainer = React.memo<PropContainer>(
  ({ children, style, safeArea, ignoreFlex }) => {
    const createStyles = (theme: Theme) => {
      return StyleSheet.create({
        container: {
          marginHorizontal: theme.spacing.double,
          marginVertical: theme.spacing.base,
          flex: ignoreFlex ? undefined : 1,
        },
      });
    };

    const Styles = useThemeAwareObject(createStyles);

    return (
      <>
        {safeArea ? (
          <SafeAreaView style={{ flex: ignoreFlex ? undefined : 1 }}>
            <View style={[Styles.container, style]}>{children}</View>
          </SafeAreaView>
        ) : (
          <View style={[Styles.container, style]}>{children}</View>
        )}
      </>
    );
  },
);
