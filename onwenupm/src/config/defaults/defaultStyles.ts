import {StyleSheet} from 'react-native';
import {Theme} from '../../config/theme/Theme.interface';
import {useThemeAwareObject} from '../../hooks';

export const createDefaultStyles = () =>
  useThemeAwareObject((theme: Theme) => {
    return StyleSheet.create({
      iconContainer: {
        backgroundColor: theme.color.bgColorS,
        width: 40,
        height: 40,
        borderRadius: theme.spacing.radius,
      },
      screen: {
        backgroundColor: theme.color.bgColor,
        flex: 1,
      },
      rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      center: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      lowOpacity: {
        opacity: 0.6,
      },
    });
  });
