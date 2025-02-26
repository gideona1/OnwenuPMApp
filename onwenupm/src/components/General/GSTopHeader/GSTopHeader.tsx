import {
  StyleProp,
  TouchableWithoutFeedbackProps,
  ViewStyle,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
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

export interface PropTopHeader extends TouchableWithoutFeedbackProps {
  /**
   * Set custom styling for the button.
   */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode | String;
  childrenOfComponents?: Boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  absolute?: boolean | null | undefined;
  currentScrollViewPosition?: Animated.SharedValue<number>;
  toggleHeaderPosition?: number;
  maxOpacity?: number;
}

export const GSTopHeader = React.memo<PropTopHeader>(
  ({
    children,
    leftComponent,
    rightComponent,
    style,
    absolute,
    currentScrollViewPosition,
    toggleHeaderPosition,
    onLayout,
    childrenOfComponents,
    maxOpacity,
  }) => {
    const createStyles = (theme: Theme) => {
      return StyleSheet.create({
        fullContainer: {
          backgroundColor: theme.color.bgColor,
          borderBottomColor: theme.color.olColor,
          borderBottomWidth: 1,
          position: absolute ? 'absolute' : undefined,
          width: absolute ? '100%' : undefined,
          // zIndex: 0,
        },

        container: {
          paddingHorizontal: theme.spacing.double,
          paddingVertical: theme.spacing.base,
          flexDirection: 'row',
          alignItems: 'center',
        },
      });
    };

    const Styles = useThemeAwareObject(createStyles);
    const { theme } = useTheme();

    // Header Animation
    const headerOpacity = useAnimatedStyle(() => {
      return {
        zIndex:
          currentScrollViewPosition !== undefined &&
            toggleHeaderPosition !== undefined
            ? currentScrollViewPosition.value > 0
              ? 1
              : -1
            : 1,

        opacity: withTiming(
          currentScrollViewPosition !== undefined &&
            toggleHeaderPosition !== undefined
            ? currentScrollViewPosition.value > toggleHeaderPosition
              ? (maxOpacity ? maxOpacity : 1)
              : 0
            : (maxOpacity ? maxOpacity : 1),
          {
            duration: 200,
          },
        ),
      };
    });

    return (
      <Animated.View
        onLayout={onLayout}
        style={[Styles.fullContainer, headerOpacity]}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row' }}>
            <View style={[Styles.container, style, { flex: 0.2 }]}>
              {leftComponent}
            </View>

            <View
              style={[
                Styles.container,
                style,
                { flex: 0.6, justifyContent: 'center' },
              ]}>
              <View>
                {childrenOfComponents ? (
                  <View>{children}</View>
                ) : (
                  <GSText
                    maxFontSizeMultiplier={1.25}
                    numberOfLines={1}
                    weight="bold"
                    size={14}>
                    {children}
                  </GSText>
                )}
              </View>
            </View>

            <View style={[Styles.container, style, { flex: 0.2 }]}>
              {rightComponent}
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    );
  },
);
