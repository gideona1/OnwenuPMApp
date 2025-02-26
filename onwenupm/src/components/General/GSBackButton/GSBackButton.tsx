import {
  StyleProp,
  TouchableWithoutFeedbackProps,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../../config/theme/Theme.context';
import { GSText } from '..';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { Theme } from '../../../config/theme/Theme.interface';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  Keyframe,
} from 'react-native-reanimated';

export interface PropBackButton extends TouchableWithoutFeedbackProps {
  /**
   * Set custom styling for the button.
   */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  modal?: boolean | null | undefined;
  /**
   * The current scroll position of the ScrollView component
   */
  currentScrollViewPosition?: Animated.SharedValue<number>;
  /**
   * 
   */
  toggleHeaderPosition?: number;
  header?: string | null | undefined;
  rightComponent?: React.ReactNode;
  customBorderColor?: string;
  textColor?: string;
  maxOpacity?: number;
}

export const GSBackButton = React.memo<PropBackButton>(
  ({
    children,
    style,
    modal,
    onPress,
    header,
    currentScrollViewPosition,
    toggleHeaderPosition,
    disabled,
    rightComponent,
    customBorderColor,
    textColor,
    maxOpacity
  }) => {
    const createStyles = (theme: Theme) => {
      return StyleSheet.create({
        container: {
          padding: theme.spacing.double,
          flexDirection: 'row',
          alignItems: 'center',
        },
      });
    };

    const Styles = useThemeAwareObject(createStyles);
    const { theme } = useTheme();

    // Header Animation
    // const opacity = useSharedValue(0);
    // const borderColor = useSharedValue(theme.color.olColor + '00');
    const headerOpacity = useAnimatedStyle(() => {
      return {
        opacity: withTiming(
          currentScrollViewPosition !== undefined &&
            toggleHeaderPosition !== undefined
            ? currentScrollViewPosition.value > toggleHeaderPosition
              ? 1
              : 0
            : 1,
          {
            duration: 200,
          },
        ),
      };
    });

    const headerBorderOpacity = useAnimatedStyle(() => {
      const border = customBorderColor ? customBorderColor : theme.color.olColor;

      return {
        borderBottomColor: withTiming(
          currentScrollViewPosition !== undefined &&
            toggleHeaderPosition !== undefined
            ? currentScrollViewPosition.value > toggleHeaderPosition
              ? border
              : border + '00'
            : border,
          { duration: 200 },
        ),
      };
    });

    return (
      <Animated.View style={[headerBorderOpacity, { borderBottomWidth: 1 }]}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              disabled={disabled}
              accessibilityRole="button"
              style={[Styles.container, style, { flex: 0.2 }]}
              onPress={onPress}>
              <FontAwesomeIcon
                style={{ opacity: 0.8 }}
                color={textColor ? textColor : theme.color.textColor}
                size={12}
                icon={modal ? faChevronDown : faChevronLeft}
              />
              <GSText
                maxFontSizeMultiplier={1.25}
                style={{ marginLeft: 5, opacity: 0.8 }}
                color={textColor ? textColor : undefined}
                weight="medium"
                size={14}>
                {children}
              </GSText>
            </TouchableOpacity>

            <View
              style={[
                Styles.container,
                style,
                { flex: 0.6, justifyContent: 'center' },
              ]}>
              <Animated.View style={headerOpacity}>
                <GSText
                  maxFontSizeMultiplier={1.25}
                  numberOfLines={1}
                  weight="bold"
                  color={textColor ? textColor : undefined}
                  size={14}>
                  {header}
                </GSText>
              </Animated.View>
            </View>
            <View
              style={[
                Styles.container,
                style,
                { flex: 0.2, justifyContent: 'flex-end' },
              ]}>
              {rightComponent}
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  },
);
