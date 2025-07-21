import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactUsScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      id: 'email',
      icon: 'mail',
      title: 'Email Us',
      detail: 'support@unilearn.edu',
      action: () => Linking.openURL('mailto:support@unilearn.edu'),
    },
    {
      id: 'phone',
      icon: 'phone',
      title: 'Call Us',
      detail: '+237 6XX XXX XXX',
      action: () => Linking.openURL('tel:+2376XXXXXX'),
    },
    {
      id: 'whatsapp',
      icon: 'whatsapp',
      title: 'WhatsApp',
      detail: '+237 6XX XXX XXX',
      action: () => Linking.openURL('https://wa.me/2376XXXXXX'),
    },
    {
      id: 'location',
      icon: 'map-marker',
      title: 'Visit Us',
      detail: 'University Avenue, Yaoundé, Cameroon',
      action: () => Linking.openURL('https://maps.google.com/?q=University+Avenue,Yaoundé,Cameroon'),
    },
  ];

  const handleSubmit = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Message Sent', 
        'Thank you for contacting us! We will get back to you soon.'
      );
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPressIn={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <View style={{ width: 24 }} /> {/* For alignment */}
        </View>

        {/* Contact Methods */}
        <Text style={styles.sectionTitle}>Quick Contact</Text>
        <View style={styles.contactMethods}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.contactCard}
              onPress={method.action}
            >
              <View style={styles.contactIcon}>
                <FontAwesome 
                  name={method.icon as any} 
                  size={24} 
                  color="#3498db" 
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactDetail}>{method.detail}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Form */}
        <Text style={styles.sectionTitle}>Send Us a Message</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="What's this about?"
              placeholderTextColor="#888"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Type your message here..."
              placeholderTextColor="#888"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.submitButton,
              (!name || !email || !subject || !message) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!name || !email || !subject || !message || isSubmitting}
          >
            {isSubmitting ? (
              <Text style={styles.submitButtonText}>Sending...</Text>
            ) : (
              <Text style={styles.submitButtonText}>Send Message</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Social Media */}
        <Text style={styles.sectionTitle}>Connect With Us</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://facebook.com/unilearn')}
          >
            <FontAwesome name="facebook" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://twitter.com/unilearn')}
          >
            <FontAwesome name="twitter" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://instagram.com/unilearn')}
          >
            <FontAwesome name="instagram" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://linkedin.com/company/unilearn')}
          >
            <FontAwesome name="linkedin" size={24} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://youtube.com/unilearn')}
          >
            <FontAwesome name="youtube" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  contactMethods: {
    paddingHorizontal: 15,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f4fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  messageInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0c4e4',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f4fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default ContactUsScreen;