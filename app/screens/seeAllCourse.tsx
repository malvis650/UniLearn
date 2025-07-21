import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
type Course = {
  id: string;
  title: string;
  instructor: string;
  field: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolled: number;
  thumbnail?: any;
  isFeatured?: boolean;
};

const SeeAllCoursesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');

  // Sample courses data
  const allCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Programming',
      instructor: 'Prof. Smith',
      field: 'Computer Science',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.8,
      enrolled: 1245,
      thumbnail: require('@/assets/images/course.jpeg'),
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Johnson',
      field: 'Computer Science',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.6,
      enrolled: 876,
    },
    {
      id: '3',
      title: 'Principles of Marketing',
      instructor: 'Prof. Williams',
      field: 'Business',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.5,
      enrolled: 765,
    },
    {
      id: '4',
      title: 'Financial Accounting',
      instructor: 'Dr. Brown',
      field: 'Business',
      level: 'Intermediate',
      duration: '8 weeks',
      rating: 4.7,
      enrolled: 932,
    },
    {
      id: '5',
      title: 'Thermodynamics',
      instructor: 'Prof. Davis',
      field: 'Engineering',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.4,
      enrolled: 654,
    },
    {
      id: '6',
      title: 'Human Anatomy',
      instructor: 'Prof. Miller',
      field: 'Health Sciences',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.7,
      enrolled: 1123,
      thumbnail: require('@/assets/images/course.jpeg'),
    },
    {
      id: '7',
      title: 'Modern Literature',
      instructor: 'Prof. Wilson',
      field: 'Humanities',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.3,
      enrolled: 543,
    },
    {
      id: '8',
      title: 'Artificial Intelligence',
      instructor: 'Dr. Taylor',
      field: 'Computer Science',
      level: 'Advanced',
      duration: '12 weeks',
      rating: 4.9,
      enrolled: 765,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'computer', label: 'Computer Science' },
    { id: 'business', label: 'Business' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'health', label: 'Health Sciences' },
  ];

  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'rating', label: 'Top Rated' },
    { id: 'newest', label: 'Newest' },
    { id: 'duration', label: 'Duration' },
  ];

  const filteredCourses = allCourses.filter(course => {
    // Filter by search query
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'computer' && course.field === 'Computer Science') ||
      (activeFilter === 'business' && course.field === 'Business') ||
      (activeFilter === 'engineering' && course.field === 'Engineering') ||
      (activeFilter === 'health' && course.field === 'Health Sciences');
    
    return matchesSearch && matchesFilter;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (activeSort === 'popular') return b.enrolled - a.enrolled;
    if (activeSort === 'rating') return b.rating - a.rating;
    if (activeSort === 'newest') return b.id.localeCompare(a.id); // Simple mock for newest
    if (activeSort === 'duration') return a.duration.localeCompare(b.duration);
    return 0;
  });

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.courseCard}>
      {item.thumbnail && (
        <Image source={item.thumbnail} style={styles.courseThumbnail} />
      )}
      <View style={styles.courseInfo}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseField}>{item.field}</Text>
          {item.isFeatured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
          )}
        </View>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        
        <View style={styles.courseMeta}>
          <View style={styles.metaItem}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="bar-chart-2" size={14} color="#3498db" />
            <Text style={styles.metaText}>{item.level}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="access-time" size={14} color="#3498db" />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people" size={14} color="#3498db" />
            <Text style={styles.metaText}>{item.enrolled.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Courses</Text>
        </View>
        <TouchableOpacity>
          <Feather name="bookmark" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <MaterialIcons name="search" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by Field</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.filterButtonActive
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text 
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.filterTextActive
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sort by</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContainer}
        >
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortButton,
                activeSort === option.id && styles.sortButtonActive
              ]}
              onPress={() => setActiveSort(option.id)}
            >
              <Text 
                style={[
                  styles.sortText,
                  activeSort === option.id && styles.sortTextActive
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <Text style={styles.resultsText}>
        {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'} found
      </Text>

      {/* Courses List */}
      <FlatList
        data={sortedCourses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={50} color="#ddd" />
            <Text style={styles.emptyText}>No courses found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    margin: 15,
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
  section: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  filterContainer: {
    paddingRight: 15,
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
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  sortContainer: {
    paddingRight: 15,
  },
  sortButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  sortButtonActive: {
    backgroundColor: '#3498db',
  },
  sortText: {
    fontSize: 14,
    color: '#555',
  },
  sortTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
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
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  courseInfo: {
    padding: 15,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  courseField: {
    fontSize: 13,
    color: '#3498db',
    fontWeight: '500',
  },
  featuredBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  featuredBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default SeeAllCoursesScreen;