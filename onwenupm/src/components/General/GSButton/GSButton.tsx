import {
  StyleProp,
  TouchableWithoutFeedbackProps,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from '../../../config/theme/Theme.context';
import { GSText } from '..';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { Theme } from '../../../config/theme/Theme.interface';
import { TextWeight } from '../../../types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface PropButton extends TouchableWithoutFeedbackProps {
  /**
   * Sets font color of text. Default is based on system appearance.
   */
  color?: string;

  /**
   * Sets background color of button if "filled" is set to false or undefined. Default is based on system appearance .
   */
  background?: string;

  /**
   * Set font size of text. Default is 14.
   */
  size?: number;

  /**
   * When set to true, an activity indicator will display to the right of the text. Default is false.
   */
  loading?: boolean;

  /**
   * When set to true, the button is an a disable state. Opacity is set to 50% and onPress is not called. Default is false.
   */
  disabled?: boolean;

  /**
   * TODO: Add Documentation
   */
  disabledTip?: string | undefined | null;

  /**
   * Set font weight of text. Default is "regular".
   */
  weight?: TextWeight;

  /**
   * Set custom styling for the button.
   */
  style?: StyleProp<ViewStyle>;

  /**
   *
   */
  outline?: boolean;

  /**
   * Set custom styling for the button.
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   *
   */
  useViewContainer?: boolean;

  /**
   * TODO: Add Documentation
   */
  icon?: IconProp;

  children?: React.ReactNode;
}

export const GSButton = React.memo<PropButton>(({
  color,
  background,
  size,
  loading,
  disabled,
  disabledTip,
  weight,
  style,
  outline,
  contentStyle,
  icon,
  children,
  useViewContainer,
  accessibilityHint,
  onPress,
}) => {
  const { theme } = useTheme();
  const pWeight = weight == null ? 'medium' : weight;

  const createStyles = (theme: Theme) => {
    return StyleSheet.create({
      container: {
        backgroundColor: background ? background : theme.color.olColor,
        paddingVertical: theme.spacing.base,
        paddingHorizontal: theme.spacing.base,
        borderRadius: theme.spacing.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'row',
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: background ? background : theme.color.olColor,
        borderWidth: 1,
      },
    });
  };

  const Styles = useThemeAwareObject(createStyles);

  return (
    <View
      style={
        disabled == true
          ? {
            opacity: 0.5,
          }
          : null
      }>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityHint={accessibilityHint}
        style={[Styles.container, outline ? Styles.outline : null, style]}
        onPress={
          disabled == true
            ? disabledTip && !loading
              ? () => Alert.alert(disabledTip)
              : undefined
            : onPress
        }>
        {useViewContainer ? (
          <View style={contentStyle}>{children}</View>
        ) : (
          <GSText
            weight={pWeight}
            color={color == null ? theme.color.textColor : color}
            size={size}>
            {children}
          </GSText>
        )}

        {loading || icon ? (
          <View style={{ marginLeft: 10 }}>
            {loading ? (
              <ActivityIndicator
                color={color == null ? theme.color.textColor : color}
              />
            ) : icon ? (
              <FontAwesomeIcon
                color={color == null ? theme.color.textColor : color}
                size={16}
                icon={icon}
              />
            ) : null}
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
});
