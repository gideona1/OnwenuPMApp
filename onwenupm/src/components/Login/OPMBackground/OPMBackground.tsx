import React from 'react';
import Svg, { Circle } from 'react-native-svg';

import { Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../config/theme/Theme.context';

export const OPMBackground = React.memo(() => {
    const { theme } = useTheme();
    const colors = ['#ffffff'];
    const { width, height } = Dimensions.get('screen');

    return (
        <View style={[StyleSheet.absoluteFill, { flex: 1, backgroundColor: theme.color.accentP }]}>
            <Svg>
                <Circle
                    r={120 + (100 * 1)}
                    fillOpacity={0}
                    strokeWidth={2}
                    stroke={colors[Math.floor(Math.random() * colors.length)]}
                    cx={20}
                    cy={height - 20}
                />

                <Circle
                    r={120 + (100 * 2)}
                    fillOpacity={0}
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    stroke={colors[Math.floor(Math.random() * colors.length)]}
                    cx={20}
                    cy={height - 20}
                />

                <Circle
                    r={120 + (100 * 3)}
                    fillOpacity={0}
                    strokeWidth={2}
                    stroke={colors[Math.floor(Math.random() * colors.length)]}
                    cx={20}
                    cy={height - 20}
                />

                <Circle
                    r={120 + (100 * 1)}
                    fillOpacity={0}
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    stroke={colors[Math.floor(Math.random() * colors.length)]}
                    cx={width - 20}
                    cy={height - 20}
                />

                <Circle
                    r={120 + (100 * 2)}
                    fillOpacity={0}
                    strokeWidth={2}
                    stroke={colors[Math.floor(Math.random() * colors.length)]}
                    cx={width - 20}
                    cy={height - 20}
                />

                <Circle
                    r={120 + (100 * 3)}
                    fillOpacity={0}
                    strokeWidth={2}
                    strokeOpacity={0.5}
                    stroke={colors[Math.floor(Math.random() * colors.length)]}
                    cx={width - 20}
                    cy={height - 20}
                />
            </Svg>
        </View>
    );
});
