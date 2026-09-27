import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppColors } from '@/constants/colors';
import { FontSize, FontFamily } from '@/constants/typography';
import { InputField } from '@/components/ui/InputField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { WayfareIcon } from '@/components/ui/WayfareIcon';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    // Mock login — navigate to set-locations
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/set-locations');
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <WayfareIcon size={64} />

          {/* Heading */}
          <View style={styles.headingBlock}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Log in to plan a trip and follow your route turn by turn.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (passwordError) setPasswordError('');
              }}
              secureTextEntry
              error={passwordError}
              containerStyle={styles.passwordField}
            />

            <TouchableOpacity style={styles.forgotLink} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer actions — stay pinned near bottom */}
        <View style={styles.footer}>
          <PrimaryButton
            label="Log in"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
          <TouchableOpacity
            style={styles.signupRow}
            activeOpacity={0.7}
            onPress={() => router.push('/set-locations')}
          >
            <Text style={styles.signupText}>New to Wayfare? </Text>
            <Text style={styles.signupLink}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 16,
    gap: 28,
  },
  headingBlock: {
    gap: 8,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontFamily: FontFamily.bold,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  passwordField: {
    marginTop: 4,
  },
  forgotLink: {
    alignSelf: 'flex-start',
  },
  forgotText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semibold,
    color: AppColors.primary,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 8 : 24,
    gap: 16,
    backgroundColor: AppColors.background,
  },
  loginButton: {
    width: '100%',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  signupText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
  signupLink: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    color: AppColors.textPrimary,
  },
});
