import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { JSX } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type SettingsItem = 
  | { title: string; icon: string; action: () => void; toggle?: undefined }
  | { title: string; icon: string; action: null; toggle: JSX.Element };

type SettingsSection = {
  title: string;
  icon: string;
  items: SettingsItem[];
};

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [autoDownloadEnabled, setAutoDownloadEnabled] = React.useState(false);

  const settingsOptions: SettingsSection[] = [
    {
      title: 'Account',
      icon: 'person-outline',
      items: [
        { title: 'Edit Profile', icon: 'edit', action: () => router.push('../screens/editProfile') },
        { title: 'Change Password', icon: 'lock', action: () => router.push('../screens/changePassword') },
        { title: 'Payment Methods', icon: 'credit-card', action: () => router.push('../screens/paymentMethod') },
      ],
    },
    {
      title: 'Preferences',
      icon: 'settings-outline',
      items: [
        { 
          title: 'Dark Mode', 
          icon: 'moon', 
          action: null,
          toggle: (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#ddd', true: '#3498db' }}
              thumbColor="#fff"
            />
          )
        },
        { 
          title: 'Notifications', 
          icon: 'notifications', 
          action: null,
          toggle: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ddd', true: '#3498db' }}
              thumbColor="#fff"
            />
          )
        },
        { 
          title: 'Auto-download Content', 
          icon: 'download', 
          action: null,
          toggle: (
            <Switch
              value={autoDownloadEnabled}
              onValueChange={setAutoDownloadEnabled}
              trackColor={{ false: '#ddd', true: '#3498db' }}
              thumbColor="#fff"
            />
          )
        },
      ],
    },
    {
      title: 'Support',
      icon: 'help-circle-outline',
      items: [
        { title: 'Help Center', icon: 'help-circle', action: () => router.push('../screens/HelpCenter') },
        { title: 'Contact Us', icon: 'mail', action: () => router.push('../screens/contactUs') },
        { title: 'Terms & Privacy', icon: 'shield', action: () => router.push('../screens/Terms&Privacy') },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require('@/assets/images/placeHolder.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Malvis Chiatoh</Text>
            <Text style={styles.profileEmail}>Malvis.Chiatoh@unilearn.edu</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('../screens/editProfile')}>
            <Feather name="edit-2" size={18} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name={section.icon as any} size={20} color="#3498db" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.sectionItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={item.action ? item.action : undefined}
                >
                  <View style={styles.itemLeft}>
                    <Feather name={item.icon as any} size={20} color="#555" />
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                  {item.toggle ? (
                    item.toggle
                  ) : (
                    <MaterialIcons name="chevron-right" size={24} color="#aaa" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?', [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Log Out', 
            style: 'destructive', 
            onPress: () => {
              console.log('Logged out');
              router.push('../(Authentication)/SignIn');
            } 
          },
        ])}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>UniLearn v1.0.0</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 25,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
    marginLeft: 10,
  },
  sectionItems: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 15,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
});

export default SettingsScreen;