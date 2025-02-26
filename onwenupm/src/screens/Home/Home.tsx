import { FlatList, ScrollView, SafeAreaView, View, StyleSheet, Image, Alert, Linking } from 'react-native';
import React, { useEffect } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { GSButton, GSContainer, GSInputField, GSText, GSTopHeader } from '../../components/General';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faDollar, faEnvelope, faFile, faHomeLg, faNewspaper, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useSharedValue } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useApolloClient } from '@apollo/client';
import { AuthLogout } from '../../services/authentication';

const Home = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();
  const scrollPosition = useSharedValue<number>(0);
  const client = useApolloClient();

  const TestData = [{

  }]

  const Listing: React.FC<{
    title: string,
    location: string,
    thumbnail: string,
    squareFoot: number,
    bedrooms: number,
    bathrooms: number,
    cost: string,
  }> = ({ title, location, squareFoot, bedrooms, bathrooms, cost, thumbnail }) => {
    return (
      <View style={screenStyles.listingContainer}>
        <View style={screenStyles.listingImage}>
          <Image style={StyleSheet.absoluteFill} source={{ uri: thumbnail }} />
        </View>

        <View style={[screenStyles.listingContentContainer, screenStyles.listingBorder]}>
          <View style={screenStyles.listingTitleContainer}>
            <GSText numberOfLines={1} ellipsizeMode={'tail'} weight={"bold"}>{title}</GSText>
            <GSText numberOfLines={1} ellipsizeMode={'tail'} weight={"medium"} size={14} style={[defaultStyles.lowOpacity, { marginTop: 4 }]}>{location}</GSText>
          </View>

          <View style={[defaultStyles.rowStyle, screenStyles.listingDetailContainer]}>
            <GSText size={12}><GSText size={14} weight={"bold"}>{squareFoot}</GSText> sqft</GSText>
            <View style={screenStyles.listingDetailSeparator} />
            <GSText size={12}><GSText size={14} weight={"bold"}>{bedrooms}</GSText> Bedrooms</GSText>
            <View style={screenStyles.listingDetailSeparator} />
            <GSText size={12}><GSText size={14} weight={"bold"}>{bathrooms}</GSText> Bathroom</GSText>
          </View>
        </View>

        <View style={[screenStyles.listingContentContainer, screenStyles.listingPriceContainer]}>
          <View style={[screenStyles.listingTitleContainer, { alignItems: 'flex-end' }]}>
            <GSText size={14} weight={"bold"}>${cost}<GSText style={defaultStyles.lowOpacity} size={12}>/month</GSText></GSText>
          </View>
        </View>
      </View>);
  }

  const Content = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={screenStyles.header}>
          <Image style={StyleSheet.absoluteFill} source={{ uri: "https://images.pexels.com/photos/1029612/pexels-photo-1029612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }} />
          <View style={[StyleSheet.absoluteFill, screenStyles.headerOpacity]} />
          <GSContainer style={{ marginBottom: 0 }} safeArea>
            <GSText size={14} color={"#ffffff"} weight="medium" allowFontScaling={false}>Onwenu <GSText size={14} weight={"bold"} color={"#ffffff"} allowFontScaling={false}>PM</GSText></GSText>
            <GSText style={{ marginTop: theme.spacing.base, lineHeight: 32 }} size={24} weight={"light"} color={"#ffffff"}><GSText size={24} weight={"bold"} color={"#ffffff"}>Look</GSText> for the <GSText size={24} weight={"bold"} color={"#ffffff"}>home</GSText> of your <GSText size={24} weight={"bold"} color={"#ffffff"}>dreams</GSText>.</GSText>
          </GSContainer>

          {/* <GSContainer style={{ marginTop: 0 }}>
            <GSInputField label='Search' placeholder='How can we help you?' showLabel={false} style={{ marginTop: 0 }} />
          </GSContainer> */}
        </View>

        {/* Uploading Documents */}
        <View>
          <GSContainer style={[defaultStyles.rowStyle]}>
            <View style={[defaultStyles.center, screenStyles.homeIconContainer]}>
              <FontAwesomeIcon color={theme.color.accentP} size={22} icon={faFile} />
            </View>
            <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
              <GSText preset='heading' style={{ marginBottom: 6 }}>Uploading Documents</GSText>
              <GSText style={defaultStyles.lowOpacity}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</GSText>
            </View>
          </GSContainer>

          <GSContainer style={{ marginTop: 0 }}>
            <GSButton onPress={() => { Linking.openURL('https://forms.monday.com/forms/ef62308a5974bb32465559dbf95d6c5a?r=use1') }} weight="bold" icon={faChevronRight} background={theme.color.accentP} color={"white"} style={{ marginTop: theme.spacing.double }}>Upload documents</GSButton>
          </GSContainer>
        </View>

        {/* Contact Us */}
        <View>
          <GSContainer style={[defaultStyles.rowStyle]}>
            <View style={[defaultStyles.center, screenStyles.homeIconContainer]}>
              <FontAwesomeIcon color={theme.color.accentP} size={22} icon={faPhone} />
            </View>
            <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
              <GSText preset='heading' style={{ marginBottom: 6 }}>Contact Us</GSText>
              <GSText style={defaultStyles.lowOpacity}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</GSText>
            </View>
          </GSContainer>

          <GSContainer style={{ marginTop: 0 }}>
            <GSButton onPress={() => { Linking.openURL('tel:+18883368024') }} weight="bold" icon={faPhone} background={theme.color.accentP} color={"white"} style={{ marginTop: theme.spacing.double }}>Call us</GSButton>
            <GSButton onPress={() => { Linking.openURL('mailto:contact@onwenupm.com') }} weight="bold" icon={faEnvelope} background={theme.color.bgColorS} color={theme.color.accentP}>Email us</GSButton>
          </GSContainer>
        </View>

        {/* Announcements */}
        <View>
          <GSContainer style={[defaultStyles.rowStyle]}>
            <View style={[defaultStyles.center, screenStyles.homeIconContainer]}>
              <FontAwesomeIcon color={theme.color.accentP} size={22} icon={faNewspaper} />
            </View>
            <View style={{ marginLeft: theme.spacing.base, marginRight: 48 - theme.spacing.base }}>
              <GSText preset='heading' style={{ marginBottom: 6 }}>Announcements</GSText>
              <GSText style={defaultStyles.lowOpacity}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</GSText>
            </View>
          </GSContainer>

          <GSContainer>
            <GSText style={defaultStyles.lowOpacity}>Cannot display announcements at this time.</GSText>
          </GSContainer>
        </View>
      </View>
    )
  }

  return (
    <View style={defaultStyles.screen}>
      <GSTopHeader
        childrenOfComponents
        currentScrollViewPosition={scrollPosition}
        toggleHeaderPosition={64}
        absolute>
        <GSText size={14} weight="medium">Onwenu <GSText weight={"bold"} color={theme.color.accentP} size={14}>PM</GSText></GSText>
      </GSTopHeader>
      <View style={{ flex: 1 }}>
        <FlatList
          onScroll={event => {
            scrollPosition.value = event.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={160}
          ListHeaderComponent={<Content />}
          data={[]}
          renderItem={() => <></>}></FlatList>
      </View>
    </View>
  );
});

export default Home