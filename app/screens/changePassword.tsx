import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = () => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    // In a real app, you would:
    // 1. Show loading state
    // 2. Call your API to change password
    // 3. Handle success/error responses
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Your password has been changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
          <View style={{ width: 24 }} /> {/* For alignment */}
        </View>

        {/* Security Tips */}
        <View style={styles.tipsContainer}>
          <MaterialIcons name="security" size={20} color="#3498db" />
          <Text style={styles.tipsText}>
            Choose a strong password with at least 8 characters, including numbers and special characters.
          </Text>
        </View>

        {/* Current Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your current password"
              placeholderTextColor="#888"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <MaterialIcons 
                name={showCurrentPassword ? "visibility-off" : "visibility"} 
                size={22} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              placeholderTextColor="#888"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <MaterialIcons 
                name={showNewPassword ? "visibility-off" : "visibility"} 
                size={22} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm new password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialIcons 
                name={showConfirmPassword ? "visibility-off" : "visibility"} 
                size={22} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Strength Indicator */}
        {newPassword.length > 0 && (
          <View style={styles.strengthContainer}>
            <Text style={styles.strengthText}>Password Strength:</Text>
            <View style={styles.strengthBarContainer}>
              <View 
                style={[
                  styles.strengthBar,
                  newPassword.length < 8 ? styles.strengthWeak : 
                  !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword) ? 
                  styles.strengthMedium : styles.strengthStrong,
                  { width: `${Math.min(100, newPassword.length * 10)}%` }
                ]}
              />
            </View>
            <Text style={styles.strengthDescription}>
              {newPassword.length < 8 ? 'Weak' : 
               !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword) ? 
               'Medium' : 'Strong'}
            </Text>
          </View>
        )}

        {/* Change Password Button */}
        <TouchableOpacity 
          style={[
            styles.changeButton,
            (!currentPassword || !newPassword || !confirmPassword) && styles.changeButtonDisabled
          ]}
          onPress={handleChangePassword}
          disabled={!currentPassword || !newPassword || !confirmPassword || isLoading}
        >
          {isLoading ? (
            <Text style={styles.changeButtonText}>Updating...</Text>
          ) : (
            <Text style={styles.changeButtonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tipsContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8f4fc',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  tipsText: {
    flex: 1,
    fontSize: 14,
    color: '#3498db',
    marginLeft: 10,
  },
  inputGroup: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  strengthContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  strengthText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  strengthBarContainer: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginBottom: 5,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 3,
  },
  strengthWeak: {
    backgroundColor: '#e74c3c',
  },
  strengthMedium: {
    backgroundColor: '#f39c12',
  },
  strengthStrong: {
    backgroundColor: '#2ecc71',
  },
  strengthDescription: {
    fontSize: 12,
    color: '#888',
  },
  changeButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  changeButtonDisabled: {
    backgroundColor: '#a0c4e4',
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ChangePasswordScreen;