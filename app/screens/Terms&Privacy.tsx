import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsPrivacyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  // Sample content - in a real app you would want complete legal documents
  const termsContent = `
1. Acceptance of Terms
By accessing or using the UniLearn mobile application, you agree to be bound by these Terms of Service.

2. User Accounts
You must provide accurate information when creating an account and keep your login credentials secure.

3. Course Enrollment
Access to course materials is granted upon successful enrollment and payment (if applicable).

4. Intellectual Property
All course materials, content, and the UniLearn application are protected by copyright and intellectual property laws.

5. Payments & Refunds
Payment for courses must be made through approved methods. Refund policies vary by course.

6. User Conduct
You agree not to misuse the services or help others do so. Prohibited activities include:
- Sharing account credentials
- Distributing course materials without authorization
- Harassing other users or instructors

7. Termination
UniLearn reserves the right to suspend or terminate accounts that violate these terms.

8. Modifications
We may modify these terms at any time. Continued use constitutes acceptance of changes.

Last Updated: ${new Date().toLocaleDateString()}
`;

  const privacyContent = `
1. Information We Collect
We collect information you provide when creating an account, enrolling in courses, or making payments. This may include:
- Personal identification information
- Payment details
- Academic interests
- Device information

2. How We Use Your Information
We use collected information to:
- Provide and improve our services
- Process payments
- Communicate with you
- Personalize your learning experience
- Ensure platform security

3. Data Protection
We implement security measures to protect your information, including:
- Encryption of sensitive data
- Secure payment processing
- Restricted access to personal information

4. Third-Party Services
We may use third-party services for:
- Payment processing
- Analytics
- Customer support
These parties have access only to information needed to perform their functions.

5. Your Rights
You have the right to:
- Access your personal data
- Request correction of inaccurate data
- Request deletion of your data (subject to legal requirements)
- Opt-out of marketing communications

6. Children's Privacy
UniLearn is not intended for children under 13. We do not knowingly collect data from children under 13.

7. Cookies & Tracking
We use cookies and similar technologies to:
- Authenticate users
- Remember preferences
- Analyze usage patterns

8. Changes to This Policy
We may update this policy periodically. We will notify you of significant changes.

Last Updated: ${new Date().toLocaleDateString()}
`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPressIn={() => router.back()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#3498db" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy</Text>
        <View style={{ width: 24 }} /> {/* For alignment */}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'terms' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('terms')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'terms' && styles.tabTextActive,
          ]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'privacy' && styles.tabActive,
          ]}
          onPress={() => setActiveTab('privacy')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'privacy' && styles.tabTextActive,
          ]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentTitle}>
          {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
        </Text>
        <Text style={styles.contentText}>
          {activeTab === 'terms' ? termsContent : privacyContent}
        </Text>
        
        {/* Acceptance Section */}
        {activeTab === 'terms' && (
          <View style={styles.acceptanceContainer}>
            <Text style={styles.acceptanceText}>
              By using UniLearn, you acknowledge that you have read and agree to these Terms of Service.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Need help? Contact us at legal@unilearn.edu
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#3498db',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 30,
  },
  acceptanceContainer: {
    backgroundColor: '#e8f4fc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  acceptanceText: {
    fontSize: 14,
    color: '#3498db',
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default TermsPrivacyScreen;