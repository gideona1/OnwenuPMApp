import { FlatList, ScrollView, SafeAreaView, View, StyleSheet, Image, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { GSButton, GSButtonList, GSContainer, GSInputField, GSText, GSTopHeader } from '../../components/General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate, faChevronRight, faDollar, faDollarSign, faExclamation, faFile, faHomeLg, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useSharedValue } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient'; 4
import { PaymentGetHistory, PaymentGetPastDue, PaymentGetUpcoming } from '../../services/payments';
import { PaymentGetPaymentSheet } from '../../services/payments/PmntGetPaymentSheet';
import { PaymentButton } from '../TestPayment/PaymentScreen';
import { Payment } from '../../types';
import { GSPaymentInfoBottomSheet } from '../../components/Pay/GSPaymentInfoBottomSheet/GSPaymentInfoBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { formatAmount, formatDate } from '../../services/methods';

const Pay = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();
  const scrollPosition = useSharedValue<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [bottomSheetPaymentId, setBottomSheetPaymentId] = useState<string | undefined>('');
  const paymentInfoBottomSheetRef = useRef<BottomSheet>(null);

  const upcomingPayment = PaymentGetUpcoming((err) => {
    Alert.alert(err.message);
  });

  const pastDuePayment = PaymentGetPastDue((err) => {
    Alert.alert(err.message);
  });

  const paymentHistory = PaymentGetHistory((err) => {
    Alert.alert(err.message);
  })

  const onRefresh = () => {
    setRefreshing(true);
    upcomingPayment.refetch();
    pastDuePayment.refetch();
    paymentHistory.refetch();
    setRefreshing(false);
  };

  const openPaymentSheet = (paymentId: string | undefined) => {
    setBottomSheetPaymentId(paymentId);
    paymentInfoBottomSheetRef.current?.snapToIndex(0);
  }

  const PastDuePaymentComponent: React.FC<{
    paymentInfo: Payment
  }> = ({ paymentInfo }) => {
    return (
      <GSContainer style={[screenStyles.payRentInformation, { paddingTop: 4, marginBottom: 0 }]}>
        <View style={defaultStyles.rowStyle}>
          <View style={{ flex: 1, marginRight: theme.spacing.base }}>
            <GSText accessibilityRole='header' weight="medium" style={{ marginBottom: 6 }}>Past due</GSText>
            <GSText weight="bold" size={18} style={{ marginBottom: 6 }}>{formatAmount(paymentInfo.paymentIntent.amount)}</GSText>
          </View>

          <View style={{ flex: 1 }}>
            <PaymentButton
              paymentId={paymentInfo.id}
              onRefresh={() => onRefresh()}
              status={paymentInfo.paymentIntent.status}
              onPressOnPaidStatus={() => openPaymentSheet(paymentInfo.id)}
            ></PaymentButton>
          </View>
        </View>

        <View style={{ paddingTop: 4, borderTopWidth: 1, borderTopColor: theme.color.olColor }}>
          <GSText color="#ff6348" style={{ marginTop: 4 }} weight="bold">Due: {formatDate(paymentInfo.dueDate)}</GSText>
          {/* <GSText>{paymentInfo.id}</GSText> */}
        </View>
      </GSContainer>
    )
  }

  const Content = () => {
    return (
      <View>
        {/* Current Payment Info. */}
        <View>
          <GSContainer style={{ marginTop: 0 }}>
            <GSText preset='heading' style={{ marginBottom: 6 }}>Payment</GSText>
          </GSContainer>

          {!pastDuePayment.loading && (pastDuePayment.data?.getPastDuePaymentInfo == [] || pastDuePayment.data?.getPastDuePaymentInfo == null) ?
            <GSContainer style={[defaultStyles.rowStyle, screenStyles.payRentInformation, { backgroundColor: '#ffeded' }]}>
              <View style={[defaultStyles.center, screenStyles.homeIconContainer, { backgroundColor: '#ffffff' }]}>
                <FontAwesomeIcon color={theme.color.accentP} size={22} icon={faExclamation} />
              </View>
              <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
                <GSText preset='subheading' style={{ marginBottom: 3, opacity: 1 }}>You have incomplete payments</GSText>
                <GSText style={defaultStyles.lowOpacity}>Please review the past due payments.</GSText>
              </View>
            </GSContainer> : null}

          <GSContainer style={{ marginTop: 0 }}>
            <GSButtonList value={"Off"} icon={faArrowsRotate} disabled>Auto Pay</GSButtonList>
          </GSContainer>

          <GSContainer style={[screenStyles.payRentInformation, { marginBottom: 0 }]}>
            <View>
              <View style={{ marginBottom: theme.spacing.base, borderBottomWidth: 1, borderBottomColor: theme.color.olColor }}>
                <GSText preset='subheading' style={{ marginBottom: theme.spacing.base }}>This Month</GSText>
              </View>
              {!upcomingPayment.loading && !upcomingPayment.error && !upcomingPayment.data?.getUpcomingPaymentInfo ?
                <View>
                  <GSText style={[defaultStyles.lowOpacity, { textAlign: 'center' }]}>No upcoming payment.</GSText>
                </View> :
                <View>
                  <GSText weight="bold" size={22} style={{ marginBottom: 6 }}>{
                    !upcomingPayment.loading && !upcomingPayment.error && upcomingPayment.data?.getUpcomingPaymentInfo ? formatAmount(upcomingPayment.data?.getUpcomingPaymentInfo.paymentIntent.amount || 0) : "$---"}</GSText>
                  <PaymentButton
                    fetching={upcomingPayment.loading || !!upcomingPayment.error || !upcomingPayment.data?.getUpcomingPaymentInfo}
                    paymentId={upcomingPayment.data?.getUpcomingPaymentInfo.id}
                    status={upcomingPayment.data?.getUpcomingPaymentInfo.paymentIntent.status}
                    onPressOnPaidStatus={() => openPaymentSheet(upcomingPayment.data?.getUpcomingPaymentInfo.id)}
                    onRefresh={() => onRefresh()}
                  ></PaymentButton>
                  <GSText style={defaultStyles.lowOpacity}>Due: {
                    !upcomingPayment.loading && !upcomingPayment.error && upcomingPayment.data?.getUpcomingPaymentInfo ? formatDate(upcomingPayment.data?.getUpcomingPaymentInfo.dueDate) : "--"
                  }</GSText>
                </View>
              }
            </View>
          </GSContainer>

          {!pastDuePayment.loading && !pastDuePayment.error ? (
            <FlatList
              data={pastDuePayment.data?.getPastDuePaymentInfo}
              renderItem={(item) => <PastDuePaymentComponent paymentInfo={item.item} />}
            ></FlatList>) : <GSContainer><ActivityIndicator /></GSContainer>}
        </View>

        {/* Past Payment Info. */}
        <View style={{ marginTop: theme.spacing.base }}>
          <GSContainer style={[defaultStyles.rowStyle]}>
            <View style={[defaultStyles.center, screenStyles.homeIconContainer]}>
              <FontAwesomeIcon color={theme.color.accentP} size={22} icon={faDollarSign} />
            </View>
            <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
              <GSText preset='heading' style={{ marginBottom: 6 }}>Payment History</GSText>
              <GSText style={defaultStyles.lowOpacity}>View all of your past payments.</GSText>
            </View>
          </GSContainer>

          <GSContainer>

            {!paymentHistory.loading && !paymentHistory.error ? (
              <FlatList
                ListEmptyComponent={<View>
                  <GSText style={[defaultStyles.lowOpacity, { textAlign: 'center' }]}>No payments have been made yet.</GSText>
                </View>}
                data={paymentHistory.data?.getPaymentHistoryInfo}
                renderItem={(item) => <GSButtonList
                  value={`${formatAmount(item.item.paymentIntent.amount)} (Paid)`}
                  icon={faReceipt}
                  onPress={() => { openPaymentSheet(item.item.id) }}
                >{formatDate(item.item.dueDate)}</GSButtonList>}
              ></FlatList>) : <ActivityIndicator />}
          </GSContainer>
        </View>
      </View>
    )
  }


  return (
    <View style={defaultStyles.screen}>
      <GSTopHeader
        currentScrollViewPosition={scrollPosition}
        toggleHeaderPosition={5}
      >
        Payment
      </GSTopHeader>
      <FlatList
        onScroll={event => {
          scrollPosition.value = event.nativeEvent.contentOffset.y;
        }}
        onRefresh={() => { onRefresh() }}
        refreshing={refreshing}
        scrollEventThrottle={160}
        ListHeaderComponent={<Content />}
        data={[]}
        renderItem={() => <></>}></FlatList>
      <GSPaymentInfoBottomSheet paymentId={bottomSheetPaymentId} reference={paymentInfoBottomSheetRef} />
    </View>
  );
});

export default Pay;