import {Dimensions, StyleSheet} from 'react-native';
import {Theme} from '../../config/theme/Theme.interface';
import {useThemeAwareObject} from '../../hooks';

const {width} = Dimensions.get('window');

export const createScreenStyles = () =>
  useThemeAwareObject((theme: Theme) => {
    return StyleSheet.create({
      homeIconContainer: {
        backgroundColor: theme.color.bgColorS,
        width: 40,
        height: 40,
        borderRadius: theme.spacing.radius,
      },

      payRentInformation: {
        backgroundColor: theme.color.bgColorS,
        paddingHorizontal: theme.spacing.base,
        paddingVertical: theme.spacing.double,
        borderRadius: theme.spacing.radius,
      },
    });
  });
