import React, { Ref, useCallback, useMemo, useRef, useState } from 'react';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '../../../config/theme/Theme.context';

import { ActivityIndicator, Alert, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { Theme } from '../../../config/theme/Theme.interface';
import { useThemeAwareObject } from '../../../hooks/ThemeAwareObject.hook';
import { GSBackButton, GSButton, GSContainer, GSText } from '../../General';
import { createDefaultStyles } from '../../../config/defaults/defaultStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faDollarSign, faHourglassHalf, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { PaymentGetChargeInfo } from '../../../services/payments';
import { formatAmount, formatDate } from '../../../services/methods';

interface Props {
  reference: Ref<BottomSheet>;
  dataLoading?: boolean;
  paymentId?: string | undefined;
}

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
    },

    payRentInformation: {
      backgroundColor: theme.color.bgColorS,
      paddingHorizontal: theme.spacing.base,
      paddingVertical: theme.spacing.double,
      borderRadius: theme.spacing.radius,
    },

    statusContainer: {
      backgroundColor: theme.color.bgColor,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.spacing.radius,
      borderColor: theme.color.olColor,
      borderWidth: 1
    }
  });
};

export const GSPaymentInfoBottomSheet: React.FC<Props> = ({
  reference,
  paymentId,
  dataLoading,
}) => {
  const { theme } = useTheme();

  const { loading, data, error, refetch } = PaymentGetChargeInfo(
    paymentId,
    err => {
      Alert.alert("There was a problem accessing payment details", err.message);
      thisSheet?.current.close();
    },
  );

  const defaultStyles = createDefaultStyles();
  const Styles = useThemeAwareObject(createStyles);

  const thisSheet: any = reference;
  const snapPoints = useMemo(() => ['70%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <>
      <BottomSheet
        ref={reference}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: theme.color.bgColor,
        }}
        handleIndicatorStyle={{ backgroundColor: theme.color.olColor }}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        <SafeAreaView style={Styles.contentContainer}>
          <GSBackButton
            onPress={() => {
              thisSheet?.current.close();
            }}
            modal
            style={{ paddingTop: 0, marginBottom: 0, backgroundColor: "#0000000" }}
            header="Payment Details">
            Close
          </GSBackButton>
          {!loading ? (
            <BottomSheetScrollView style={Styles.contentContainer}>
              <GSContainer>
                <GSText preset="subheading" style={{ marginBottom: theme.spacing.separator, marginTop: theme.spacing.base }}>Payment</GSText>
                <View style={Styles.payRentInformation}>
                  <View style={{ borderBottomColor: theme.color.olColor, borderBottomWidth: 1, paddingBottom: theme.spacing.separator, marginBottom: theme.spacing.separator }}>
                    <View style={[defaultStyles.rowStyle, { marginBottom: 4 }]}>
                      <GSText style={{ flex: 1, alignSelf: 'flex-end' }} weight="medium" size={14}>Amount:</GSText>
                      <GSText style={[{ flex: 1, textAlign: 'right' }]} weight="medium" size={18}>{formatAmount(data?.getChargeInfo.amount)}</GSText>
                    </View>

                    {/* <GSText style={defaultStyles.lowOpacity}>Due on 11/30/23</GSText> */}
                  </View>

                  <View style={[defaultStyles.rowStyle, Styles.statusContainer, { alignSelf: 'flex-end' }]}>
                    <FontAwesomeIcon icon={
                      data?.getChargeInfo.status === 'succeeded' ? faCheck :
                        data?.getChargeInfo.status === 'processing' ? faHourglassHalf
                          : faDollarSign
                    } size={12} color={theme.color.textColor} />
                    <GSText style={[defaultStyles.lowOpacity, { marginLeft: 4 }]}>
                      {
                        data?.getChargeInfo.status === 'succeeded' ? 'Succeded' :
                          data?.getChargeInfo.status === 'processing' ? 'Processing'
                            : 'Requires Payment'
                      }
                    </GSText>
                  </View>
                </View>

                <View style={{ marginTop: theme.spacing.double }}>
                  <GSText style={[defaultStyles.lowOpacity]}>Payment ID: {paymentId}</GSText>
                </View>
              </GSContainer>

              <GSContainer>
                <GSText preset="subheading" style={{ marginBottom: theme.spacing.separator, marginTop: theme.spacing.base }}>Charge</GSText>
                <View style={Styles.payRentInformation}>
                  <View style={{ borderBottomColor: theme.color.olColor, borderBottomWidth: 1, paddingBottom: theme.spacing.separator, marginBottom: theme.spacing.separator }}>
                    <View style={[defaultStyles.rowStyle, { marginBottom: 4 }]}>
                      <GSText style={{ flex: 1, alignSelf: 'flex-end' }} weight="medium" size={14}>Payment Method:</GSText>
                      <GSText style={[{ flex: 1, textAlign: 'right' }, defaultStyles.lowOpacity]} weight="medium" size={14}>{data?.getChargeInfo.paymentMethod === 'card' ? 'Card' : data?.getChargeInfo.paymentMethod === 'us_bank_account' ? "U.S. Bank" : "Unknown"} (...{data?.getChargeInfo.paymentLastFour})</GSText>
                    </View>
                  </View>

                  <View>
                    <View style={[defaultStyles.rowStyle, { marginVertical: 4 }]}>
                      <GSText style={{ flex: 1, alignSelf: 'flex-end' }} weight="medium" size={14}>Date Paid:</GSText>
                      <GSText style={[{ flex: 1, textAlign: 'right' }, defaultStyles.lowOpacity]} weight="medium" size={14}>{formatDate(data?.getChargeInfo.created * 1000, true)}</GSText>
                    </View>
                  </View>
                </View>

              </GSContainer>

              <GSContainer style={{ marginBottom: theme.spacing.double * 2 }}>
                <GSText preset="subheading" style={{ marginBottom: theme.spacing.separator, marginTop: theme.spacing.base }}>Receipt</GSText>

                <GSButton disabled={!data?.getChargeInfo.receiptLink} onPress={() => { Linking.openURL(data?.getChargeInfo.receiptLink || "") }} weight="bold" icon={faReceipt} background={theme.color.accentP} color={"white"}>View Receipt</GSButton>
                {/* <GSText style={[defaultStyles.lowOpacity, { textAlign: 'center' }]}>Receipt Number: 1211-1962</GSText> */}
              </GSContainer>
            </BottomSheetScrollView>) :
            (
              <GSContainer style={defaultStyles.center}>
                <ActivityIndicator />
              </GSContainer>
            )
          }
        </SafeAreaView>
      </BottomSheet>
    </>
  );
};
