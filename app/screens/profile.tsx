import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const ProfileScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const stats = [
    { label: 'Courses', value: '24' },
    { label: 'Workshops', value: '12' },
    { label: 'Following', value: '156' },
    { label: 'Followers', value: '289' },
  ];

  const courses = [
    { id: 1, title: 'Web Development', progress: 85 },
    { id: 2, title: 'Mobile App Design', progress: 42 },
    { id: 3, title: 'Data Science', progress: 30 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      <ScrollView>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <LinearGradient
            colors={['#6366f1', '#3498db']}
            style={styles.profileImage}
          >
            <Text style={styles.profileInitial}>M</Text>
          </LinearGradient>
          <Text style={styles.name}>Malvis Chiatoh</Text>
          <Text style={styles.bio}>UI/UX Designer & Developer</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('../screens/editProfile')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              {index < stats.length - 1 && <View style={styles.statDivider} />}
            </View>
          ))}
        </View>

        {/* Courses Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          {courses.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseProgress}>{course.progress}% Complete</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {[1].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Learner</Text>
              </View>
            ))}
            {[2].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Designer</Text>
              </View>
            ))}
            {[3].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Best Project</Text>
              </View>
            ))}
            {[4].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Developer</Text>
              </View>
            ))}
            {[5].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Manager</Text>
              </View>
            ))}
            {[6].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Journalist</Text>
              </View>
            ))}
            {[7].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Photographer</Text>
              </View>
            ))}
            {[9].map((item) => (
              <View key={item} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <Text style={styles.achievementTitle}>Top Accountant</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
    alignSelf: 'center',
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4, // Add elevation and shadow for a more realistic look
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#6366f1',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  editButtonText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statDivider: {
    position: 'absolute',
    right: 0,
    height: '60%',
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  courseCard: {
    marginBottom: 16,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  courseProgress: {
    fontSize: 14,
    color: '#64748b',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
});

export default ProfileScreen;