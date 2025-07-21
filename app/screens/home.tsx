import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Type definitions
type Course = {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: any;
  category: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
};

// Sample data
const courses: Course[] = [
  {
    id: '1',
    title: 'software Engineering Fundamentals',
    instructor: 'Prof. Smith',
    progress: 0.65,
    thumbnail: require('@/assets/images/course.jpeg'),
    category: 'computer engineering',
  },
  {
    id: '2',
    title: 'Banking and Finance',
    instructor: 'Dr. Johnson',
    progress: 0.3,
    thumbnail: require('@/assets/images/accounting.jpg'),
    category: 'Accounting',
  },
  {
    id: '3',
    title: 'House Wiring and Installation',
    instructor: 'Prof. Williams',
    progress: 0.8,
    thumbnail: require('@/assets/images/electrical.jpg'),
    category: 'Electrical Engineering',
  },
];

const categories: Category[] = [
  { id: '1', name: 'Computer Science', icon: 'code' },
  { id: '2', name: 'Mathematics', icon: 'calculator' },
  { id: '3', name: 'Engineering', icon: 'engineering' },
  { id: '4', name: 'Business', icon: 'business' },
  { id: '5', name: 'Humanities', icon: 'menu-book' },
];

const announcements = [
  {
    id: '1',
    title: 'Midterm Schedule Posted',
    date: '2 hours ago',
  },
  {
    id: '2',
    title: 'New Courses Added',
    date: '1 day ago',
  },
  {
    id: '3',
    title: 'Maintenance Scheduled',
    date: '3 days ago',
  },
];

const UniLearnHome: React.FC = () => {
  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.courseCard}>
      <Image source={item.thumbnail} style={styles.courseThumbnail} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${item.progress * 100}%` }]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(item.progress * 100)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <MaterialIcons name={item.icon as any} size={24} color="#3498db" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderAnnouncementItem = ({ item }: { item: typeof announcements[0] }) => (
    <View style={styles.announcementItem}>
      <View style={styles.announcementBullet} />
      <View style={styles.announcementContent}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Student!</Text>
            <Text style={styles.subtitle}>What would you like to learn today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => router.push('../screens/profile')}>
            <Image 
              source={require('@/assets/images/placeHolder.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="#888" />
          <Text style={styles.searchPlaceholder}>Search courses, materials...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={() => router.push('../screens/fieldOfStudyPage')}>
        <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />

        {/* Continue Learning */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <TouchableOpacity onPress={() => router.push('../screens/seeAllCourse')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesContainer}
        />

        {/* Announcements */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity onPress={() => router.push('../screens/seeAllAnnouncement')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.announcementsContainer}>
          <FlatList
            data={announcements}
            renderItem={renderAnnouncementItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Featured Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Courses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[...courses].reverse()}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesContainer}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#888',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  seeAll: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryName: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
  coursesContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  courseThumbnail: {
    width: '100%',
    height: 120,
  },
  courseInfo: {
    padding: 15,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
  announcementsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  announcementItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  announcementBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3498db',
    marginTop: 6,
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  announcementDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default UniLearnHome;