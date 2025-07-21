import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Using Expo Router for navigation
import React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const RoleSelectionScreen = () => {
  const router = useRouter();

  const handleRoleSelection = (role: 'student' | 'teacher') => {
    // In a real app, you might want to save this selection
    // AsyncStorage.setItem('userRole', role);
    
    // Navigate to the appropriate dashboard
    if (role === 'student') {
      router.push('./Dashboard'); // Assuming this is the student dashboard
    } else {
      router.push('./Dashboard'); // Assuming this is the teacher dashboard
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('@/assets/images/UniLearn Background removed.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to UniLearn</Text>
        <Text style={styles.subtitle}>Are you a student or teacher?</Text>
      </View>

      {/* Role Selection Cards */}
      <View style={styles.cardsContainer}>
        {/* Student Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleRoleSelection('student')}
        >
          <View style={[styles.cardIconContainer, styles.studentIcon]}>
            <MaterialIcons name="school" size={40} color="#3498db" />
          </View>
          <Text style={styles.cardTitle}>I'm a Student</Text>
          <Text style={styles.cardDescription}>
            Access courses, track your progress, and enhance your learning journey
          </Text>
        </TouchableOpacity>

        {/* Teacher Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => handleRoleSelection('teacher')}
        >
          <View style={[styles.cardIconContainer, styles.teacherIcon]}>
            <MaterialIcons name="person" size={40} color="#3498db" />
          </View>
          <Text style={styles.cardTitle}>I'm a Teacher</Text>
          <Text style={styles.cardDescription}>
            Create and manage courses, track student progress, and share knowledge
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Note */}
      <Text style={styles.footerNote}>
        You can change your role later in account settings
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  cardsContainer: {
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  studentIcon: {
    backgroundColor: '#e8f4fc',
  },
  teacherIcon: {
    backgroundColor: '#f0f8fc',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  footerNote: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
});

export default RoleSelectionScreen;