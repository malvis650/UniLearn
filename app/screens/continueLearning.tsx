import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Course = {
  id: string;
  title: string;
  instructor: string;
  thumbnail: any;
  progress: number;
  lastAccessed: string;
  nextLesson: string;
  duration: string;
  category: string;
};

const ContinueLearningScreen: React.FC = () => {
  // Sample courses data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to programming with Python',
      instructor: 'Prof. Smith',
      thumbnail: require('@/assets/images/course.jpeg'),
      progress: 0.65,
      lastAccessed: '2 days ago',
      nextLesson: 'Data Structures: Arrays',
      duration: '8 weeks',
      category: 'Computer Science',
    },
    {
      id: '2',
      title: 'Fundamentals of Electrical Engineering',
      instructor: 'Dr. Johnson',
      thumbnail: require('@/assets/images/electrical.jpg'),
      progress: 0.3,
      lastAccessed: '1 week ago',
      nextLesson: 'Circuit Analysis Basics',
      duration: '10 weeks',
      category: 'Engineering',
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      instructor: 'Prof. Williams',
      thumbnail: require('@/assets/images/course.jpeg'),
      progress: 0.8,
      lastAccessed: 'Yesterday',
      nextLesson: 'UI/UX Design Basics',
      duration: '6 weeks',
      category: 'Graphic and UI/UX Design',
    },
    {
      id: '4',
      title: 'Financial Accounting',
      instructor: 'Dr. Brown',
      thumbnail: require('@/assets/images/course.jpeg'),
      progress: 0.45,
      lastAccessed: '3 days ago',
      nextLesson: 'Balance Sheets',
      duration: '8 weeks',
      category: 'Business',
    },
  ];

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.courseCard}>
      <Image source={item.thumbnail} style={styles.courseThumbnail} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseCategory}>{item.category}</Text>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${item.progress * 100}%` },
                item.progress > 0.7 ? styles.progressHigh :
                item.progress > 0.4 ? styles.progressMedium :
                styles.progressLow
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(item.progress * 100)}% Complete</Text>
        </View>

        {/* Course Meta */}
        <View style={styles.courseMeta}>
          <View style={styles.metaItem}>
            <MaterialIcons name="access-time" size={16} color="#3498db" />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialIcons name="update" size={16} color="#3498db" />
            <Text style={styles.metaText}>{item.lastAccessed}</Text>
          </View>
        </View>

        {/* Next Lesson */}
        <View style={styles.nextLesson}>
          <Ionicons name="book" size={16} color="#3498db" />
          <Text style={styles.nextLessonText} numberOfLines={1}>
            Next: {item.nextLesson}
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue Learning</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#3498db" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Continue Learning</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="filter" size={20} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Courses List */}
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="menu-book" size={50} color="#ddd" />
            <Text style={styles.emptyText}>No active courses</Text>
            <Text style={styles.emptySubtext}>Enroll in courses to see them here</Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Courses</Text>
            </TouchableOpacity>
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
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
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
  courseCategory: {
    fontSize: 13,
    color: '#3498db',
    fontWeight: '500',
    marginBottom: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressHigh: {
    backgroundColor: '#2ecc71',
  },
  progressMedium: {
    backgroundColor: '#f39c12',
  },
  progressLow: {
    backgroundColor: '#e74c3c',
  },
  progressText: {
    fontSize: 12,
    color: '#555',
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 5,
  },
  nextLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  nextLessonText: {
    flex: 1,
    fontSize: 13,
    color: '#3498db',
    marginLeft: 8,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  continueButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
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
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#3498db',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ContinueLearningScreen;