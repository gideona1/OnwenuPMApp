import {Dimensions, StyleSheet} from 'react-native';
import {Theme} from '../../config/theme/Theme.interface';
import {useThemeAwareObject} from '../../hooks';

const {width} = Dimensions.get('window');

export const createScreenStyles = () =>
  useThemeAwareObject((theme: Theme) => {
    return StyleSheet.create({
      headerContainer: {
        backgroundColor: theme.color.olColor,
        borderBottomColor: theme.color.olColor,
        borderBottomWidth: 1,
        marginBottom: theme.spacing.double,
      },

      profilePictureContainer: {
        backgroundColor: theme.color.bgColor,
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.double,
      },
    });
  });
