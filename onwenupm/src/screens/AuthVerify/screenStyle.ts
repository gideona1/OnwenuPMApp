import {StyleSheet} from 'react-native';
import {Theme} from '../../config/theme/Theme.interface';
import {useThemeAwareObject} from '../../hooks';

export const createScreenStyles = () =>
  useThemeAwareObject((theme: Theme) => {
    return StyleSheet.create({
      codeContainer: {
        backgroundColor: theme.color.bgColorS,
        borderRadius: theme.spacing.radius,
        paddingVertical: theme.spacing.base,
      },

      tipContainer: {
        borderBottomColor: theme.color.olColor,
        borderBottomWidth: 1,
        marginBottom: theme.spacing.base,
        paddingBottom: theme.spacing.base,
      },
    });
  });
