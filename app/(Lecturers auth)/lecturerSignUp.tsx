import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ID: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    setError('');
    
    // Validation
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('./Dashboard/Home');
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subtitle}>Join our learning community</Text>
        </View>

        {/* Error Message */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Name Inputs */}
        <View style={styles.nameContainer}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              placeholderTextColor="#95a5a6"
              value={form.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              placeholderTextColor="#95a5a6"
              value={form.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
          </View>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="your@university.edu"
            placeholderTextColor="#95a5a6"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <Image
            source={require('@/assets/images/icons8-email-50.png')}
            style={styles.inputIcon}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 6 characters"
            placeholderTextColor="#95a5a6"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          <Image
            source={require('@/assets/images/icons8-lock-50.png')}
            style={styles.inputIcon}
          />
          <TouchableOpacity 
            style={styles.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                showPassword 
                  ? require('@/assets/images/icons8-hide-50.png')
                  : require('@/assets/images/icons8-eye-50.png')
              }
              style={styles.passwordVisibilityIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#95a5a6"
            secureTextEntry={!showConfirmPassword}
            value={form.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />
          <Image
            source={require('@/assets/images/icons8-lock-50.png')}
            style={styles.inputIcon}
          />
          <TouchableOpacity 
            style={styles.showPasswordButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Image
              source={
                showConfirmPassword 
                  ? require('@/assets/images/icons8-hide-50.png')
                  : require('@/assets/images/icons8-eye-50.png')
              }
              style={styles.passwordVisibilityIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Terms Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            {agreeTerms ? (
              <View style={styles.checkedBox}>
                <Image
                  source={require('@/assets/images/icons8-checkmark-50.png')}
                  style={styles.checkIcon}
                />
              </View>
            ) : (
              <View style={styles.uncheckedBox} />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signUpButton, !agreeTerms && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={loading || !agreeTerms}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Already have account */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Link href="/SignIn" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 8,
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
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
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
    paddingRight: 55,
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
  showPasswordButton: {
    position: 'absolute',
    right: 20,
    top: 43,
    padding: 5,
  },
  passwordVisibilityIcon: {
    width: 22,
    height: 22,
    tintColor: '#3498db',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  checkbox: {
    marginRight: 12,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#95a5a6',
  },
  checkedBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  termsText: {
    fontSize: 14,
    color: '#7f8c8d',
    flex: 1,
  },
  termsLink: {
    color: '#3498db',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    shadowColor: '#bdc3c7',
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  loginText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  loginLink: {
    color: '#3498db',
    fontWeight: '600',
  },
});

export default SignUp;