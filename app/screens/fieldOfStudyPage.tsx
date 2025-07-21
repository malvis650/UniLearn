import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type FieldOfStudy = {
  id: string;
  title: string;
  description: string;
  icon: string;
  coursesCount: number;
  careers: string[];
  popularCourses: Course[];
};

type Course = {
  id: string;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  thumbnail?: any;
};

const FieldsOfStudyScreen: React.FC = () => {
  const [expandedField, setExpandedField] = useState<string | null>(null);

  // Sample data for fields of study
  const fieldsOfStudy: FieldOfStudy[] = [
    {
      id: '1',
      title: 'Computer Science',
      description: 'Explore the fundamentals of computing, algorithms, and software development.',
      icon: 'code',
      coursesCount: 42,
      careers: ['Software Developer', 'Data Scientist', 'Systems Analyst', 'AI Engineer'],
      popularCourses: [
        {
          id: '101',
          title: 'Introduction to Programming',
          instructor: 'Prof. Smith',
          level: 'Beginner',
          duration: '8 weeks',
          rating: 4.8,
          thumbnail: require('@/assets/images/course.jpeg'),
        },
        {
          id: '102',
          title: 'Data Structures & Algorithms',
          instructor: 'Dr. Johnson',
          level: 'Intermediate',
          duration: '10 weeks',
          rating: 4.6,
        },
      ],
    },
    {
      id: '2',
      title: 'Business Administration',
      description: 'Learn management principles, marketing strategies, and financial analysis.',
      icon: 'business',
      coursesCount: 35,
      careers: ['Business Analyst', 'Marketing Manager', 'Financial Advisor', 'Entrepreneur'],
      popularCourses: [
        {
          id: '201',
          title: 'Principles of Marketing',
          instructor: 'Prof. Williams',
          level: 'Beginner',
          duration: '6 weeks',
          rating: 4.5,
        },
        {
          id: '202',
          title: 'Financial Accounting',
          instructor: 'Dr. Brown',
          level: 'Intermediate',
          duration: '8 weeks',
          rating: 4.7,
        },
      ],
    },
    {
      id: '3',
      title: 'Engineering',
      description: 'Master technical skills in various engineering disciplines.',
      icon: 'engineering',
      coursesCount: 38,
      careers: ['Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer', 'Project Manager'],
      popularCourses: [
        {
          id: '301',
          title: 'Thermodynamics',
          instructor: 'Prof. Davis',
          level: 'Intermediate',
          duration: '10 weeks',
          rating: 4.4,
        },
        {
          id: '302',
          title: 'Circuit Analysis',
          instructor: 'Dr. Wilson',
          level: 'Advanced',
          duration: '12 weeks',
          rating: 4.6,
        },
      ],
    },
    {
      id: '4',
      title: 'Health Sciences',
      description: 'Study human health, disease prevention, and medical practices.',
      icon: 'medical-services',
      coursesCount: 28,
      careers: ['Doctor', 'Nurse', 'Pharmacist', 'Medical Researcher'],
      popularCourses: [
        {
          id: '401',
          title: 'Human Anatomy',
          instructor: 'Prof. Miller',
          level: 'Beginner',
          duration: '8 weeks',
          rating: 4.7,
        },
        {
          id: '402',
          title: 'Medical Ethics',
          instructor: 'Dr. Taylor',
          level: 'Intermediate',
          duration: '6 weeks',
          rating: 4.5,
        },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedField(expandedField === id ? null : id);
  };

  const renderFieldItem = ({ item }: { item: FieldOfStudy }) => (
    <View style={styles.fieldCard}>
      <TouchableOpacity 
        style={styles.fieldHeader}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.fieldTitleContainer}>
          <MaterialIcons name={item.icon as any} size={24} color="#3498db" />
          <Text style={styles.fieldTitle}>{item.title}</Text>
        </View>
        <MaterialIcons 
          name={expandedField === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={24} 
          color="#3498db" 
        />
      </TouchableOpacity>

      {expandedField === item.id && (
        <View style={styles.fieldContent}>
          <Text style={styles.fieldDescription}>{item.description}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Career Paths</Text>
            <View style={styles.careersContainer}>
              {item.careers.map((career, index) => (
                <View key={index} style={styles.careerPill}>
                  <Text style={styles.careerText}>{career}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Courses</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All ({item.coursesCount})</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.coursesContainer}
            >
              {item.popularCourses.map(course => (
                <TouchableOpacity key={course.id} style={styles.courseCard}>
                  {course.thumbnail && (
                    <Image source={course.thumbnail} style={styles.courseThumbnail} />
                  )}
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                    <Text style={styles.courseInstructor}>{course.instructor}</Text>
                    <View style={styles.courseMeta}>
                      <View style={styles.metaItem}>
                        <MaterialIcons name="star" size={16} color="#FFD700" />
                        <Text style={styles.metaText}>{course.rating}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Feather name="bar-chart-2" size={14} color="#3498db" />
                        <Text style={styles.metaText}>{course.level}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <MaterialIcons name="access-time" size={14} color="#3498db" />
                        <Text style={styles.metaText}>{course.duration}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
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
          <Text style={styles.headerTitle}>Fields of Study</Text>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => router.push('../screens/search')}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchIcon}>
          <MaterialIcons name="search" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Fields of Study List */}
      <FlatList
        data={fieldsOfStudy}
        renderItem={renderFieldItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  searchIcon: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 20,
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
    paddingTop: 15,
    paddingBottom: 30,
  },
  fieldCard: {
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
    overflow: 'hidden',
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  fieldTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  fieldContent: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  fieldDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  seeAll: {
    color: '#3498db',
    fontSize: 13,
    fontWeight: '500',
  },
  careersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginBottom: 10,
  },
  careerPill: {
    backgroundColor: '#e8f4fc',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
  },
  careerText: {
    fontSize: 13,
    color: '#3498db',
  },
  coursesContainer: {
    paddingBottom: 5,
  },
  courseCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
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
    height: 100,
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default FieldsOfStudyScreen;