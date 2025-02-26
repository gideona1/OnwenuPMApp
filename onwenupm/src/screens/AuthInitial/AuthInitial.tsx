import { KeyboardAvoidingView, ScrollView, Platform, SafeAreaView, View, Alert, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { GSButton, GSContainer, GSInputField, GSText } from '../../components/General';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AuthCreateVerification } from '../../services/authentication';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../../navigation/props/AuthScreenProps';
import { OPMBackground } from '../../components/Login/OPMBackground/OPMBackground';

const AuthInitial = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();
  const navigation = useNavigation<AuthScreenProp>();

  const [email, setEmail] = useState<string>('');
  const [loadingActivity, setLoadingActivity] = useState<boolean>(false);

  const { createVerification } = AuthCreateVerification(
    email,
    () => {
      setLoadingActivity(false);
      navigation.push('Auth/Verify', { email });
    },
    error => {
      Alert.alert('Error', error.message);
      setLoadingActivity(false);
    },
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <OPMBackground />
        <SafeAreaView style={[defaultStyles.screen, { backgroundColor: 'transparent' }]}>
          <View style={{ flex: 1 }}>
            <GSContainer style={{ marginTop: 45, alignItems: 'center' }}>
              <FontAwesomeIcon style={{ marginBottom: 8 }} icon={faHome} color={"#ffffff"} size={32} />
              <GSText size={28} color={"#ffffff"} weight="medium" allowFontScaling={false}>Onwenu <GSText size={28} weight={"bold"} allowFontScaling={false} color={"#ffffff"}>PM</GSText></GSText>
              <GSText size={18} color={"#ffffff"} weight="bold" allowFontScaling={false} style={[defaultStyles.lowOpacity, { textAlign: 'center', marginTop: 8 }]}>Manage your account and pay rent.</GSText>
            </GSContainer>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={theme.spacing.double}
            style={{ flex: 0.8 }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <GSContainer ignoreFlex style={screenStyles.emailContainer}>
                <GSContainer ignoreFlex>
                  <GSInputField
                    onSubmitEditing={() => {
                      setLoadingActivity(true);
                      createVerification();
                    }}
                    disableSubmit={
                      email == '' || loadingActivity
                    }
                    returnKeyType="go"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect={true}
                    textContentType="emailAddress" label='Enter your email to continue.' placeholder="janedoe@email.com" />
                  <GSButton
                    weight="bold"
                    icon={faChevronRight}
                    background={theme.color.accentP}
                    color={"white"}
                    style={{ marginTop: theme.spacing.double }}
                    disabled={
                      email == '' || loadingActivity
                    }
                    loading={loadingActivity}
                    onPress={() => {
                      setLoadingActivity(true);
                      createVerification();
                    }}
                  >Continue</GSButton>
                </GSContainer>
              </GSContainer>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default AuthInitial