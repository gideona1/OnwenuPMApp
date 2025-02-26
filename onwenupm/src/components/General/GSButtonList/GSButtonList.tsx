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
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TextWeight } from '../../../types';

export interface PropButtonList extends TouchableWithoutFeedbackProps {
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
   * Set custom styling for the button.
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   *
   */
  useViewContainer?: boolean;

  viewStyle?: StyleProp<ViewStyle>;
  /**
   * TODO: Add Documentation
   */
  icon?: IconProp;

  urgent?: boolean;

  value?: string | undefined | null;

  children?: React.ReactNode;
}

export const GSButtonList: React.FC<PropButtonList> = ({
  color,
  size,
  loading,
  disabled,
  disabledTip,
  weight,
  style,
  icon,
  urgent,
  children,
  accessibilityHint,
  onPress,
  useViewContainer,
  viewStyle,
  value,
}) => {
  const { theme } = useTheme();
  const pWeight = weight == null ? 'medium' : weight;

  const createStyles = (theme: Theme) => {
    return StyleSheet.create({
      container: {
        borderBottomColor: theme.color.olColor,
        borderBottomWidth: 1,
        paddingVertical: theme.spacing.base,
        // paddingHorizontal: theme.spacing.base,
        alignItems: 'center',
        flexDirection: 'row',
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
        style={[Styles.container, style]}
        onPress={
          disabled == true
            ? disabledTip && loading == false
              ? () => Alert.alert(disabledTip)
              : undefined
            : onPress
        }>
        {icon ? (
          <View style={{ flex: 0.1, alignItems: 'flex-start' }}>
            <FontAwesomeIcon
              color={color == null ? theme.color.textColor : color}
              style={{ opacity: 0.7 }}
              size={16}
              icon={icon}
            />
          </View>
        ) : null}

        <View style={{ flex: 0.5 }}>
          {useViewContainer ? (
            <View style={viewStyle}>{children}</View>
          ) : (
            <GSText
              weight={pWeight}
              color={color == null ? theme.color.textColor : color}
              size={size}>
              {children}
            </GSText>
          )}
        </View>

        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          {value ? (
            <GSText
              style={{ opacity: 0.5, marginRight: 8 }}
              numberOfLines={1}
              color={color == null ? theme.color.textColor : color}
              size={size}>
              {value}
            </GSText>
          ) : null}

          {urgent ? (
            <View
              style={{
                width: 6,
                height: 6,
                marginRight: 8,
                backgroundColor: theme.color.accentP,
                borderRadius: 64,
              }}></View>
          ) : null}

          {loading ? (
            <ActivityIndicator
              color={color == null ? theme.color.textColor : color}
              style={{ opacity: 0.7 }}
              size={12}
            />
          ) : (
            <FontAwesomeIcon
              color={color == null ? theme.color.textColor : color}
              style={{ opacity: 0.7 }}
              size={12}
              icon={faChevronRight}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
