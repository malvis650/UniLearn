import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type HelpTopic = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

const HelpCenterScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Sample FAQ data
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, navigate to the course catalog, select your desired course, and click the "Enroll" button. You may need to complete payment if the course is not free.',
    },
    {
      id: '2',
      question: 'Can I access course materials offline?',
      answer: 'Yes, you can download course materials for offline access. Go to the course details page and look for the download icon next to each resource.',
    },
    {
      id: '3',
      question: 'How do I reset my password?',
      answer: 'On the login screen, click "Forgot Password" and enter your email address. You will receive a link to reset your password.',
    },
    {
      id: '4',
      question: 'What payment methods are accepted?',
      answer: 'We accept Mobile Money (MTN, Orange), Express Union, Afriland First Bank, and major credit cards.',
    },
    {
      id: '5',
      question: 'How do I contact my instructor?',
      answer: 'Each course has a discussion forum where you can post questions. You can also message instructors directly through the "Messages" section of the app.',
    },
  ];

  // Help topics
  const helpTopics: HelpTopic[] = [
    {
      id: 'account',
      title: 'Account Help',
      icon: 'account-circle',
      description: 'Password reset, profile settings, and account security',
    },
    {
      id: 'courses',
      title: 'Courses',
      icon: 'book',
      description: 'Enrollment, materials access, and course navigation',
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: 'payment',
      description: 'Billing, refunds, and payment methods',
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: 'computer',
      description: 'App issues, troubleshooting, and system requirements',
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 24 }} /> {/* For alignment */}
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help articles..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Popular Topics */}
        <Text style={styles.sectionTitle}>Popular Topics</Text>
        <View style={styles.topicsContainer}>
          {helpTopics.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                activeTopic === topic.id && styles.topicCardActive,
              ]}
              onPress={() => setActiveTopic(topic.id)}
            >
              <MaterialIcons 
                name={topic.icon as any} 
                size={28} 
                color={activeTopic === topic.id ? '#3498db' : '#555'} 
              />
              <Text style={[
                styles.topicTitle,
                activeTopic === topic.id && styles.topicTitleActive,
              ]}>
                {topic.title}
              </Text>
              <Text style={styles.topicDescription}>{topic.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>
          {searchQuery ? 'Search Results' : 'Frequently Asked Questions'}
        </Text>
        <View style={styles.faqContainer}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(faq.id)}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <MaterialIcons 
                    name={expandedFaq === faq.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                    size={24} 
                    color="#3498db" 
                  />
                </TouchableOpacity>
                {expandedFaq === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    <TouchableOpacity style={styles.helpfulButton}>
                      <Text style={styles.helpfulButtonText}>Was this helpful?</Text>
                      <View style={styles.helpfulButtons}>
                        <TouchableOpacity style={styles.helpfulYes}>
                          <Feather name="thumbs-up" size={16} color="#2ecc71" />
                          <Text style={styles.helpfulYesText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.helpfulNo}>
                          <Feather name="thumbs-down" size={16} color="#e74c3c" />
                          <Text style={styles.helpfulNoText}>No</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View style={styles.noResults}>
              <MaterialIcons name="search-off" size={40} color="#ddd" />
              <Text style={styles.noResultsText}>No results found</Text>
              <Text style={styles.noResultsSubtext}>Try different keywords</Text>
            </View>
          )}
        </View>

        {/* Still Need Help? */}
        <View style={styles.needHelpContainer}>
          <Text style={styles.needHelpTitle}>Still need help?</Text>
          <Text style={styles.needHelpText}>
            Can't find what you're looking for? Our support team is ready to assist you.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <FontAwesome name="whatsapp" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Chat with Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailButton}>
            <MaterialIcons name="email" size={20} color="#3498db" />
            <Text style={styles.emailButtonText}>Email Us</Text>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
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
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  topicCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  topicCardActive: {
    borderColor: '#3498db',
    backgroundColor: '#f5faff',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
    marginBottom: 5,
  },
  topicTitleActive: {
    color: '#3498db',
  },
  topicDescription: {
    fontSize: 13,
    color: '#666',
  },
  faqContainer: {
    paddingHorizontal: 15,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 10,
  },
  faqAnswer: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
  },
  helpfulButton: {
    marginTop: 10,
  },
  helpfulButtonText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  helpfulButtons: {
    flexDirection: 'row',
  },
  helpfulYes: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f8f0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  helpfulYesText: {
    fontSize: 13,
    color: '#2ecc71',
    marginLeft: 5,
  },
  helpfulNo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fae8e8',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  helpfulNoText: {
    fontSize: 13,
    color: '#e74c3c',
    marginLeft: 5,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    fontWeight: '500',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  needHelpContainer: {
    backgroundColor: '#e8f4fc',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 25,
    alignItems: 'center',
  },
  needHelpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 8,
  },
  needHelpText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366', // WhatsApp green
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  emailButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default HelpCenterScreen;