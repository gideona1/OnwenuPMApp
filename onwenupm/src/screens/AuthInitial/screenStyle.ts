import {StyleSheet} from 'react-native';
import {Theme} from '../../config/theme/Theme.interface';
import {useThemeAwareObject} from '../../hooks';

export const createScreenStyles = () =>
  useThemeAwareObject((theme: Theme) => {
    return StyleSheet.create({
      emailContainer: {
        backgroundColor: theme.color.bgColorS,
        borderRadius: theme.spacing.radius,
        paddingVertical: theme.spacing.base,
      },
    });
  });
