import { SafeAreaView, View } from 'react-native';
import React from 'react';

import { createDefaultStyles } from '../../config/defaults/defaultStyles';
import { createScreenStyles } from './screenStyle';
import { useTheme } from '../../config/theme/Theme.context';

const Template = React.memo(() => {
  const defaultStyles = createDefaultStyles();
  const screenStyles = createScreenStyles();
  const { theme } = useTheme();


  return (
    <SafeAreaView style={defaultStyles.screen}>
      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
});

export default Template