import { useRouter } from 'expo-router';
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

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [ID, setID] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
    if (!ID || ID) {
      setError('Please enter the correct ID');
      setLoading(false);
      return;
    }}

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Replace with actual authentication logic
      if (ID === '12UNI1EN7') {
        router.replace('../Dashboard');
      } else {
        setError('Invalid ID');
      } 
      if (email === '1' && password === '1') {
        router.replace('../Dashboard');
      } else {
        setError('Invalid email or password');
      }
    }, 1500);
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
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to access the Lecturer's page</Text>
        </View>

        {/* Error Message */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Email Input */}
        <View style={styles.inputContainer}>
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
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#95a5a6"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

              {/* ID checking */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Lecturer ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your ID"
            placeholderTextColor="#95a5a6"
            autoCapitalize="none"
            value={ID}
            onChangeText={setID}
          />
          <Image
            source={require('@/assets/images/icons8-eye-50.png')}
            style={styles.inputIcon}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Social Login */}
        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialLoginText}>Or sign in with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('@/assets/images/icons8-google-48.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('@/assets/images/icons8-facebook-logo-48.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('@/assets/images/icons8-apple-logo-50.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/Signup')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  socialLoginText: {
    color: '#7f8c8d',
    marginBottom: 15,
    fontSize: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  signUpText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  signUpLink: {
    color: '#3498db',
    fontWeight: '600',
  },
});

export default Login;