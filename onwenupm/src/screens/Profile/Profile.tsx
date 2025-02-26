import { FlatList, ScrollView, SafeAreaView, View, StyleSheet, Image, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { GSButton, GSButtonList, GSContainer, GSInputField, GSText, GSTopHeader } from '../../components/General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate, faBell, faChevronRight, faDollar, faDollarSign, faFile, faHomeLg, faRightFromBracket, faUser, faUserAlt, faUserPlus, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useSharedValue } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { initializePaymentSheet, openPaymentSheet } from '../TestPayment/TestPayment';
import { AuthLogout } from '../../services/authentication';
import { useApolloClient } from '@apollo/client';
import { QueryUserProfile } from '../../services/queries';

const Profile = React.memo(() => {
  const client = useApolloClient();
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();
  const scrollPosition = useSharedValue<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { loading, data, error, refetch } = QueryUserProfile(err => {
    Alert.alert(err.message);
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <View style={defaultStyles.screen}>
      <GSTopHeader
        currentScrollViewPosition={scrollPosition}
        toggleHeaderPosition={45}
        absolute>
        Profile
      </GSTopHeader>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        onScroll={event => {
          scrollPosition.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={160}
      >
        <View>
          {/* Header */}
          <View style={screenStyles.headerContainer}>
            {/* <LinearGradient start={{ x: 0, y: -1.5 }} end={{ x: 0, y: 0.9 }} colors={[theme.color.accentS, theme.color.bgColor]}> */}
            <GSContainer style={{ marginBottom: -16 }} safeArea>
              <View style={screenStyles.profilePictureContainer}>
                <FontAwesomeIcon color={theme.color.textColor} size={18} icon={faUserAlt} />
              </View>
              <GSText color={theme.color.accentP} style={[{ marginBottom: 4 }]}>Hey,</GSText>
              <GSText size={20}>{!loading && !error ? data?.getUser.name : "Tenant"}</GSText>

              <GSButton icon={faRightFromBracket} style={{ marginTop: theme.spacing.base }} background={theme.color.bgColor} onPress={() => {
                AuthLogout(client);
              }}>Log out</GSButton>
            </GSContainer>
            {/* </LinearGradient> */}
          </View>

          {
            data && data?.getUser.userType == 'admin' ?
              <View>
                <GSContainer style={[defaultStyles.rowStyle]}>
                  <View style={[defaultStyles.center, defaultStyles.iconContainer]}>
                    <FontAwesomeIcon color={theme.color.accentP} size={20} icon={faUserTie} />
                  </View>
                  <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
                    <GSText preset='heading' style={{ marginBottom: 6 }}>Admin Console</GSText>
                    {/* <GSText style={defaultStyles.lowOpacity}>Add and manage tenants.</GSText> */}
                  </View>
                </GSContainer>

                <GSContainer>
                  <GSText preset='subheading' style={{ marginBottom: 6 }}>Tenants</GSText>
                  <GSButtonList icon={faUser} >Manage Tenant</GSButtonList>
                  <GSButtonList icon={faUserPlus}>Create Tenant</GSButtonList>
                </GSContainer>

                <GSContainer>
                  <GSText preset='subheading' style={{ marginBottom: 6 }}>Others</GSText>
                  <GSButtonList icon={faBell}>Create Announcement</GSButtonList>
                </GSContainer>
              </View> : null
          }

          <View>
            <GSContainer style={[defaultStyles.rowStyle]}>
              <View style={[defaultStyles.center, defaultStyles.iconContainer]}>
                <FontAwesomeIcon color={theme.color.accentP} size={20} icon={faUser} />
              </View>
              <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
                <GSText preset='heading' style={{ marginBottom: 6 }}>Personal Deatils</GSText>
                <GSText style={defaultStyles.lowOpacity}>Edit your name, email, phone number.</GSText>
              </View>
            </GSContainer>

            <GSContainer>
              {!loading && !error ?
                <>
                  <GSButtonList value={data?.getUser.name}>Name</GSButtonList>
                  <GSButtonList value={data?.getUser.email}>Email</GSButtonList>
                  <GSButtonList value={data?.getUser.phoneNumber}>Phone Number</GSButtonList>
                </> :
                <ActivityIndicator style={{ marginVertical: theme.spacing.double }} />
              }
            </GSContainer>
          </View>

          <View>
            <GSContainer style={[defaultStyles.rowStyle]}>
              <View style={[defaultStyles.center, defaultStyles.iconContainer]}>
                <FontAwesomeIcon color={theme.color.accentP} size={20} icon={faFile} />
              </View>
              <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
                <GSText preset='heading' style={{ marginBottom: 6 }}>Documents</GSText>
                <GSText style={defaultStyles.lowOpacity}>View all of your documents.</GSText>
              </View>
            </GSContainer>

            <GSContainer>
              <GSButtonList >Invoice document</GSButtonList>
              <GSButtonList urgent>Action needed</GSButtonList>
            </GSContainer>
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

export default Profile;