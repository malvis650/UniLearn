import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RESEND_COOLDOWN = 30; // 30 seconds cooldown

type ResetMethod = 'email' | 'phone';

const ForgotPassword = () => {
  const router = useRouter();
  const [resetMethod, setResetMethod] = useState<ResetMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [codeSent, setCodeSent] = useState(false);

  // Handle countdown timer
  useEffect(() => {
    let timer: number;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    // Simple validation - at least 10 digits
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const handleResetRequest = () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (resetMethod === 'email') {
      if (!email) {
        setError('Please enter your email address');
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
    } else {
      if (!phone) {
        setError('Please enter your phone number');
        setLoading(false);
        return;
      }

      if (!validatePhone(phone)) {
        setError('Please enter a valid phone number');
        setLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
      setCooldown(RESEND_COOLDOWN);
      setSuccess(
        resetMethod === 'email'
          ? `Password reset link sent to ${email}`
          : `Verification code sent to ${phone}`
      );
    }, 1500);
  };

  const handleResendCode = () => {
    if (cooldown > 0) return;

    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCooldown(RESEND_COOLDOWN);
      setSuccess(
        resetMethod === 'email'
          ? `New password reset link sent to ${email}`
          : `New verification code sent to ${phone}`
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Header */}
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/UniLearn Background removed.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Choose how you want to reset your password
            </Text>
          </View>

          {/* Reset Method Toggle */}
          <View style={styles.methodToggleContainer}>
            <TouchableOpacity
              style={[
                styles.methodButton,
                resetMethod === 'email' && styles.methodButtonActive,
              ]}
              onPress={() => setResetMethod('email')}
            >
              <Text
                style={[
                  styles.methodButtonText,
                  resetMethod === 'email' && styles.methodButtonTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                resetMethod === 'phone' && styles.methodButtonActive,
              ]}
              onPress={() => setResetMethod('phone')}
            >
              <Text
                style={[
                  styles.methodButtonText,
                  resetMethod === 'phone' && styles.methodButtonTextActive,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Success Message */}
          {success ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>{success}</Text>
            </View>
          ) : null}

          {/* Input Fields - Only show if code hasn't been sent yet */}
          {!codeSent ? (
            <View style={styles.inputContainer}>
              {resetMethod === 'email' ? (
                <>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your university email"
                    placeholderTextColor="#95a5a6"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Image
                    source={require('@/assets/images/icons8-email-50.png')}
                    style={styles.inputIcon}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#95a5a6"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                  <Image
                    source={require('@/assets/images/icons8-iphone-16-pro-50.png')}
                    style={styles.inputIcon}
                  />
                </>
              )}
            </View>
          ) : (
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationText}>
                {resetMethod === 'email'
                  ? `Email sent to: ${email}`
                  : `Code sent to: ${phone}`}
              </Text>
            </View>
          )}

          {/* Verification Code Input - Only show for phone after code is sent */}
          {codeSent && resetMethod === 'phone' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Verification Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#95a5a6"
                keyboardType="number-pad"
                maxLength={6}
              />
              <Image
                source={require('@/assets/images/icons8-lock-50.png')}
                style={styles.inputIcon}
              />
            </View>
          )}

          {/* New Password Input - Only show for email after code is sent */}
          {codeSent && resetMethod === 'email' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#95a5a6"
                secureTextEntry={true}
              />
              <Image
                source={require('@/assets/images/icons8-lock-50.png')}
                style={styles.inputIcon}
              />
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={codeSent ? () => router.replace('../Dashboard') : handleResetRequest}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.resetButtonText}>
                {codeSent
                  ? resetMethod === 'email'
                    ? 'Update Password'
                    : 'Verify Code'
                  : 'Send Reset Link'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Resend Code Button - Only show after code is sent */}
          {codeSent && (
            <TouchableOpacity
              style={[
                styles.resendButton,
                cooldown > 0 && styles.resendButtonDisabled,
              ]}
              onPress={handleResendCode}
              disabled={cooldown > 0 || loading}
            >
              {loading ? (
                <ActivityIndicator color="#3498db" />
              ) : (
                <Text style={styles.resendButtonText}>
                  {cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : 'Resend Code'}
                </Text>
              )}
            </TouchableOpacity>
          )}

          {/* Back to Login Link */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Remember your password?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 8,
  },
  methodToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 5,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  methodButtonActive: {
    backgroundColor: '#3498db',
  },
  methodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  methodButtonTextActive: {
    color: '#fff',
  },
  errorContainer: {
    backgroundColor: '#fdecea',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: 15,
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  successText: {
    color: '#2e7d32',
    textAlign: 'center',
    fontSize: 15,
  },
  inputContainer: {
    marginBottom: 25,
    position: 'relative',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingLeft: 55,
    paddingRight: 20,
    height: 55,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    position: 'absolute',
    left: 20,
    top: 43,
    width: 22,
    height: 22,
    tintColor: '#95a5a6',
  },
  confirmationContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
  },
  confirmationText: {
    color: '#2c3e50',
    fontSize: 15,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  resendButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  resendButtonDisabled: {
    borderColor: '#95a5a6',
  },
  resendButtonText: {
    color: '#3498db',
    fontWeight: '700',
    fontSize: 18,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLinkText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  loginLink: {
    color: '#3498db',
    fontWeight: '600',
  },
});

export default ForgotPassword;