import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorAvatar?: any;
  isImportant: boolean;
  isUnread: boolean;
};

const AnnouncementsScreen: React.FC = () => {
  // Sample announcements data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Midterm Schedule Posted',
      content: 'The midterm schedule for all courses has been posted. Please check your course pages for specific dates and times.',
      date: '2 hours ago',
      author: 'Academic Office',
      authorAvatar: require('@/assets/images/UniLearn Background removed.png'),
      isImportant: true,
      isUnread: true,
    },
    {
      id: '2',
      title: 'New Courses Added for Next Semester',
      content: 'We have added 5 new elective courses to our offerings for the upcoming semester. Registration opens next Monday.',
      date: '1 day ago',
      author: 'Registrar',
      isImportant: false,
      isUnread: true,
    },
    {
      id: '3',
      title: 'System Maintenance Scheduled',
      content: 'The UniLearn platform will be undergoing maintenance this Saturday from 2:00 AM to 4:00 AM. The system may be unavailable during this time.',
      date: '3 days ago',
      author: 'IT Department',
      isImportant: false,
      isUnread: false,
    },
    {
      id: '4',
      title: 'Scholarship Application Deadline',
      content: 'Reminder: The deadline for submitting scholarship applications is this Friday at 5:00 PM. Late submissions will not be accepted.',
      date: '5 days ago',
      author: 'Financial Aid Office',
      authorAvatar: require('@/assets/images/financialAid.jpeg'),
      isImportant: true,
      isUnread: false,
    },
    {
      id: '5',
      title: 'Library Extended Hours',
      content: 'During finals week, the university library will be open 24 hours. Please remember to bring your student ID for access.',
      date: '1 week ago',
      author: 'Library Services',
      isImportant: false,
      isUnread: false,
    },
  ];

  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <TouchableOpacity 
      style={[
        styles.announcementCard,
        item.isUnread && styles.unreadAnnouncement,
        item.isImportant && styles.importantAnnouncement,
      ]}
    >
      <View style={styles.announcementHeader}>
        {item.authorAvatar && (
          <Image source={item.authorAvatar} style={styles.avatar} />
        )}
        <View style={styles.announcementHeaderText}>
          <Text style={styles.announcementTitle}>{item.title}</Text>
          <Text style={styles.announcementAuthor}>{item.author}</Text>
        </View>
        {item.isImportant && (
          <MaterialIcons name="error-outline" size={20} color="#e74c3c" />
        )}
      </View>
      <Text style={styles.announcementContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.announcementFooter}>
        <Text style={styles.announcementDate}>{item.date}</Text>
        {item.isUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>New</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push('../screens/home')}>
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Announcements</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="filter-list" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterButtonTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Important</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Unread</Text>
        </TouchableOpacity>
      </View>

      {/* Announcements List */}
      <FlatList
        data={announcements}
        renderItem={renderAnnouncementItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="announcement" size={50} color="#ddd" />
            <Text style={styles.emptyText}>No announcements available</Text>
          </View>
        }
      />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#555',
  },
  filterButtonTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  announcementCard: {
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
  unreadAnnouncement: {
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  importantAnnouncement: {
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  announcementHeaderText: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  announcementAuthor: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  announcementContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementDate: {
    fontSize: 12,
    color: '#888',
  },
  unreadBadge: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  unreadBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 15,
  },
});

export default AnnouncementsScreen;