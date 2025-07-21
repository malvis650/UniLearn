import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type Exam = {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: 'Midterm' | 'Final' | 'Quiz' | 'Assignment';
  status: 'Upcoming' | 'Completed' | 'Missed';
  preparationStatus?: number; // 0-100
};

const SeeAllExamsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('upcoming');

  // Sample exams data
  const allExams: Exam[] = [
    {
      id: '1',
      title: 'Midterm Examination',
      course: 'Introduction to Programming',
      date: '2023-11-15',
      time: '09:00 AM',
      duration: '2 hours',
      location: 'Building A, Room 203',
      type: 'Midterm',
      status: 'Upcoming',
      preparationStatus: 65,
    },
    {
      id: '2',
      title: 'Final Exam',
      course: 'Data Structures & Algorithms',
      date: '2023-12-10',
      time: '01:30 PM',
      duration: '3 hours',
      location: 'Building C, Room 105',
      type: 'Final',
      status: 'Upcoming',
      preparationStatus: 30,
    },
    {
      id: '3',
      title: 'Week 5 Quiz',
      course: 'Principles of Marketing',
      date: '2023-10-20',
      time: '10:00 AM',
      duration: '1 hour',
      location: 'Online',
      type: 'Quiz',
      status: 'Completed',
    },
    {
      id: '4',
      title: 'Final Project Submission',
      course: 'Financial Accounting',
      date: '2023-12-05',
      time: '11:59 PM',
      duration: '-',
      location: 'Online',
      type: 'Assignment',
      status: 'Upcoming',
      preparationStatus: 80,
    },
    {
      id: '5',
      title: 'Midterm Exam',
      course: 'Thermodynamics',
      date: '2023-10-25',
      time: '02:00 PM',
      duration: '2.5 hours',
      location: 'Building B, Room 301',
      type: 'Midterm',
      status: 'Missed',
    },
    {
      id: '6',
      title: 'Chapter 3 Quiz',
      course: 'Human Anatomy',
      date: '2023-11-05',
      time: '09:30 AM',
      duration: '45 mins',
      location: 'Online',
      type: 'Quiz',
      status: 'Upcoming',
      preparationStatus: 90,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'midterm', label: 'Midterms' },
    { id: 'final', label: 'Finals' },
    { id: 'quiz', label: 'Quizzes' },
    { id: 'assignment', label: 'Assignments' },
  ];

  const statusFilters = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'missed', label: 'Missed' },
  ];

  const filteredExams = allExams.filter(exam => {
    // Filter by search query
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exam.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'midterm' && exam.type === 'Midterm') ||
      (activeFilter === 'final' && exam.type === 'Final') ||
      (activeFilter === 'quiz' && exam.type === 'Quiz') ||
      (activeFilter === 'assignment' && exam.type === 'Assignment');
    
    // Filter by status
    const matchesStatusFilter = 
      activeStatusFilter === 'upcoming' && exam.status === 'Upcoming' ||
      activeStatusFilter === 'completed' && exam.status === 'Completed' ||
      activeStatusFilter === 'missed' && exam.status === 'Missed';
    
    return matchesSearch && matchesFilter && matchesStatusFilter;
  });

  const renderExamItem = ({ item }: { item: Exam }) => (
    <TouchableOpacity style={[
      styles.examCard,
      item.status === 'Completed' && styles.completedExam,
      item.status === 'Missed' && styles.missedExam,
    ]}>
      <View style={styles.examHeader}>
        <View style={styles.examTypeBadge}>
          <Text style={styles.examTypeText}>{item.type}</Text>
        </View>
        {item.status === 'Upcoming' && item.preparationStatus !== undefined && (
          <View style={styles.preparationContainer}>
            <Text style={styles.preparationText}>Preparation: {item.preparationStatus}%</Text>
            <View style={styles.preparationBar}>
              <View 
                style={[
                  styles.preparationProgress, 
                  { width: `${item.preparationStatus}%` },
                  item.preparationStatus > 70 ? styles.progressGood :
                  item.preparationStatus > 40 ? styles.progressMedium :
                  styles.progressLow
                ]}
              />
            </View>
          </View>
        )}
        {item.status === 'Completed' && (
          <View style={styles.statusBadge}>
            <MaterialIcons name="check-circle" size={16} color="#2ecc71" />
            <Text style={styles.statusText}>Completed</Text>
          </View>
        )}
        {item.status === 'Missed' && (
          <View style={styles.statusBadge}>
            <MaterialIcons name="cancel" size={16} color="#e74c3c" />
            <Text style={styles.statusText}>Missed</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.examTitle}>{item.title}</Text>
      <Text style={styles.examCourse}>{item.course}</Text>
      
      <View style={styles.examDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="date-range" size={18} color="#3498db" />
          <Text style={styles.detailText}>{item.date} • {item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="access-time" size={18} color="#3498db" />
          <Text style={styles.detailText}>{item.duration}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="location-on" size={18} color="#3498db" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>
      
      {item.status === 'Upcoming' && (
        <TouchableOpacity style={styles.studyButton}>
          <Text style={styles.studyButtonText}>Study Materials</Text>
        </TouchableOpacity>
      )}
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
          <Text style={styles.headerTitle}>All Exams</Text>
        </View>
        <TouchableOpacity>
          <Feather name="calendar" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <MaterialIcons name="search" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exams..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Status Filters */}
      <View style={styles.section}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusFilterContainer}
        >
          {statusFilters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.statusFilterButton,
                activeStatusFilter === filter.id && styles.statusFilterButtonActive
              ]}
              onPress={() => setActiveStatusFilter(filter.id)}
            >
              <Text 
                style={[
                  styles.statusFilterText,
                  activeStatusFilter === filter.id && styles.statusFilterTextActive
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Type Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by Type</Text>
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

      {/* Results Count */}
      <Text style={styles.resultsText}>
        {filteredExams.length} {filteredExams.length === 1 ? 'exam' : 'exams'} found
      </Text>

      {/* Exams List */}
      <FlatList
        data={filteredExams}
        renderItem={renderExamItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="assignment" size={50} color="#ddd" />
            <Text style={styles.emptyText}>No exams found</Text>
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
  statusFilterContainer: {
    paddingRight: 15,
  },
  statusFilterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  statusFilterButtonActive: {
    backgroundColor: '#3498db',
  },
  statusFilterText: {
    fontSize: 14,
    color: '#555',
  },
  statusFilterTextActive: {
    color: '#fff',
    fontWeight: '500',
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
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  completedExam: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  missedExam: {
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  examTypeBadge: {
    backgroundColor: '#e8f4fc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  examTypeText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  preparationContainer: {
    flex: 1,
    marginLeft: 15,
  },
  preparationText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  preparationBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
  },
  preparationProgress: {
    height: '100%',
    borderRadius: 3,
  },
  progressGood: {
    backgroundColor: '#2ecc71',
  },
  progressMedium: {
    backgroundColor: '#f39c12',
  },
  progressLow: {
    backgroundColor: '#e74c3c',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  examTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  examCourse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  examDetails: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
  },
  studyButton: {
    backgroundColor: '#3498db',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  studyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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

export default SeeAllExamsScreen;