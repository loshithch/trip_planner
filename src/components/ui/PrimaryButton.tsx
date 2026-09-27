import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { AppColors } from '@/constants/colors';
import { FontSize, FontFamily } from '@/constants/typography';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={AppColors.white} />
      ) : (
        <Text style={[styles.label, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.primary,
    borderRadius: 100,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  disabled: {
    backgroundColor: '#D1D5DB',
  },
  label: {
    color: AppColors.white,
    fontSize: FontSize.md,
    fontFamily: FontFamily.semibold,
    letterSpacing: 0.2,
  },
});
