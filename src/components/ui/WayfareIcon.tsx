import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AppColors } from '@/constants/colors';

// Wayfare logo icon — orange rounded square with S.png brand image
export function WayfareIcon({ size = 56 }: { size?: number }) {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size * 0.25 },
      ]}
    >
      <Image
        source={require('../../../assets/images/S.png')}
        style={{ width: size * 0.65, height: size * 0.65 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
