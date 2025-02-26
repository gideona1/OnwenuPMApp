import { KeyboardAvoidingView, ScrollView, Platform, SafeAreaView, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';
import { GSButton, GSContainer, GSInputField, GSText } from '../../components/General';
import { faChevronRight, faHome, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AuthCreateVerification, AuthVerifyCode } from '../../services/authentication';
import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../../navigation/props/AuthScreenProps';
import { useCountdown } from 'usehooks-ts';

interface Props {
  route: {
    params: {
      email: string;
    };
  };
}

const AuthVerify = React.memo<Props>(({ route }) => {
  const { email } = route.params;

  const client = useApolloClient();
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const navigation = useNavigation<AuthScreenProp>();

  const [code, setCode] = useState<string>('');
  const [loadingActivity, setLoadingActivity] = useState<boolean>(false);
  const [verifyLoadingActivity, setVerifyLoadingActivity] = useState<boolean>(false);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  useEffect(() => {
    startCountdown();
  }, [])

  const { verifyCode } = AuthVerifyCode(
    email,
    code,
    client,
    token => {
      setLoadingActivity(false);
      navigation.navigate('Auth/Initial');
    },
    error => {
      Alert.alert('Cannot verify your account', error.message);
      setLoadingActivity(false);
    },
  );

  const { createVerification } = AuthCreateVerification(
    email,
    () => {
      setVerifyLoadingActivity(false);
      Alert.alert("Sent", `We sent another verification code to ${email}`);
      resetCountdown();
      startCountdown();
    },
    error => {
      Alert.alert('Error', error.message);
      setVerifyLoadingActivity(false);
    },
  );

  const { theme } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[defaultStyles.screen, { backgroundColor: theme.color.accentP }]}>
        <View style={{ flex: 1 }}>
          <GSContainer style={{ marginTop: 45 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.75,
              }}>
              <FontAwesomeIcon icon={faLock} color="#ffffff" />
            </View>
            <GSText
              weight="bold"
              color="#fff"
              style={{ marginTop: 20 }}
              size={28}>
              Verify
            </GSText>
            <GSText color="#fff" size={16} style={{ marginTop: 6 }}>
              Enter the one-time verification code sent to your email to log in.
            </GSText>
          </GSContainer>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={75}
          style={{ flex: 0.8 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <GSContainer ignoreFlex style={screenStyles.codeContainer}>
              <GSContainer ignoreFlex>
                <View style={screenStyles.tipContainer}>
                  <GSText size={16} style={[defaultStyles.lowOpacity, { marginBottom: 6 }]}>
                    You will receive an email shortly at: {email}
                  </GSText>
                </View>

                <GSInputField
                  label={"One-time code"}
                  onChangeText={text => setCode(text)}
                  disableSubmit={
                    code.length !== 6 || loadingActivity
                  }
                  onSubmitEditing={() => {
                    setLoadingActivity(true);
                    verifyCode()
                  }}
                  returnKeyType="go"

                  placeholder={"6-Digit Code"}
                  spellCheck={false}
                  autoCapitalize="none"
                  max={6}
                  value={code}
                  autoCorrect={false}
                  keyboardType='number-pad' />
                <GSButton weight="bold" icon={faChevronRight} background={theme.color.accentP} color={"white"} style={{ marginTop: theme.spacing.double }}
                  disabled={
                    code.length !== 6 || loadingActivity
                  }
                  loading={loadingActivity}
                  onPress={() => {
                    setLoadingActivity(true);
                    verifyCode()
                  }}
                >Log in</GSButton>
                <GSButton weight="bold"
                  disabled={
                    count > 0 || loadingActivity || verifyLoadingActivity
                  }
                  loading={verifyLoadingActivity}
                  onPress={() => {
                    setVerifyLoadingActivity(true);
                    createVerification();
                  }}
                >Resend code {count > 0 ? `(${count})` : ''}</GSButton>
              </GSContainer>
            </GSContainer>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
});

export default AuthVerify