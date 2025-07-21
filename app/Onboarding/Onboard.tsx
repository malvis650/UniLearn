import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Welcome to UniLearn',
      description: 'Your all-in-one platform for smarter and simpler university learning. Discover a world of knowledge with our cutting-edge courses and workshops.',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 2,
      title: 'Learn From Experts',
      description: 'Get access to industry professionals and top-tier academic resources',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 3,
      title: 'Learn Smarter, Not Harder',
      description: 'Access your courses, grades, attendance, and announcements — all in one place.',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 4,
      title: 'Stay Organized',
      description: 'Keep track of your assignments, deadlines, and class schedules effortlessly',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 5,
      title: 'Join Our Community',
      description: 'Connect with like-minded students and grow your professional network',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 6,
      title: 'Interactive Learning',
      description: 'Engage with interactive content and hands-on projects to enhance your learning experience',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 7,
      title: 'Flexible Learning',
      description: 'Access your courses anytime, anywhere, on any device',
      image: require('@/assets/images/UniLearn Background removed.png'),
    },
    {
      id: 8,
      title: 'Ready to Get Started?',
      description: 'Begin your educational journey with us today',
      image: require('@/assets/images/UniLearn Background removed.png'),
    }
  ];

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('../checking'); // Navigate to the checking screen after the last slide
      // Optionally, you can also reset the currentSlide to 0 if you want to
      // restart the onboarding process next time the user visits
      // setCurrentSlide(0);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Skip Button */}
      {currentSlide < slides.length - 1 && (
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push('../checking')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={slides[currentSlide].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Indicator Section */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlide === index && styles.activeIndicator
            ]}
          />
        ))}
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.description}>{slides[currentSlide].description}</Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        {/* Previous Button (only show if not on first slide) */}
        {currentSlide > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.prevButton]}
            onPress={goToPrevSlide}
          >
            <Text style={[styles.buttonText, styles.prevButtonText]}>Previous</Text>
          </TouchableOpacity>
        )}

        {/* Next/Get Started Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.nextButton,
            { flex: currentSlide === 0 ? 1 : 0.7 }
          ]}
          onPress={goToNextSlide}
        >
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: height * 0.06,
    right: 25,
    zIndex: 1,
  },
  skipText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
  imageContainer: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#3498db',
    width: 20,
  },
  textContainer: {
    paddingHorizontal: 40,
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  prevButtonText: {
    color: '#3498db',
  },
  prevButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3498db',
  },
});

export default Onboarding;