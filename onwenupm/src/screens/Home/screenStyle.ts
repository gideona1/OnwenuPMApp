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

      header: {
        paddingVertical: theme.spacing.double,
        backgroundColor: theme.color.olColor,
        marginBottom: theme.spacing.double,
      },

      headerOpacity: {
        backgroundColor: '#0000005f',
      },

      headerItemContainer: {
        flex: 1,
        width: width / 2,
      },

      listingContainer: {
        backgroundColor: theme.color.bgColor,
        borderColor: theme.color.olColor,
        borderWidth: 1,
        borderRadius: 6,
        overflow: 'hidden',
        width: 288,
        marginRight: theme.spacing.double,
      },

      listingImage: {
        backgroundColor: theme.color.bgColorS,
        // borderBottomColor: theme.color.olColor,
        // borderBottomWidth: 1,
        borderRadius: 3,
        overflow: 'hidden',
        height: 160,
        margin: 8,
      },

      listingContentContainer: {
        paddingVertical: theme.spacing.base,
      },

      listingBorder: {
        borderBottomColor: theme.color.olColor,
        borderBottomWidth: 1,
      },

      listingTitleContainer: {
        // paddingTop: theme.spacing.base,
        paddingHorizontal: theme.spacing.base,
      },

      listingDetailContainer: {
        paddingHorizontal: theme.spacing.base,
        paddingTop: 12,
      },

      listingDetailSeparator: {
        width: 4,
        height: 4,
        backgroundColor: theme.color.textColor,
        borderRadius: 32,
        marginHorizontal: 8,
        opacity: 0.3,
      },

      listingPriceContainer: {
        backgroundColor: theme.color.bgColorS,
      },
    });
  });
