import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddPostScreen: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const categories = [
    'Lecture Notes',
    'Assignment Help',
    'Study Group',
    'General Discussion',
    'Resource Share'
  ];

  const handlePost = () => {
    // Handle post submission logic here
    console.log('Post submitted:', {
      text: postText,
      category: selectedCategory,
      image: attachedImage
    });
    // Reset form
    setPostText('');
    setSelectedCategory(null);
    setAttachedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Post</Text>
        </View>

        {/* Post Content */}
        <View style={styles.postContainer}>
          <TextInput
            style={styles.postInput}
            placeholder="What would you like to share with your classmates?"
            placeholderTextColor="#888"
            multiline
            numberOfLines={6}
            value={postText}
            onChangeText={setPostText}
          />

          {/* Attached Image Preview */}
          {attachedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: attachedImage }} 
                style={styles.imagePreview}
              />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setAttachedImage(null)}
              >
                <Ionicons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.attachButton}
              onPress={() => {
                // In a real app, this would open the image picker
                setAttachedImage('https://example.com/sample-image.jpg');
              }}
            >
              <MaterialIcons name="attach-file" size={24} color="#3498db" />
              <Text style={styles.attachButtonText}>Attach Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextSelected
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity 
          style={[
            styles.postButton,
            (!postText || !selectedCategory) && styles.postButtonDisabled
          ]}
          disabled={!postText || !selectedCategory}
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post to Community</Text>
        </TouchableOpacity>
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
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    marginTop: 15,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  attachButtonText: {
    marginLeft: 8,
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  categoryButtonSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  categoryText: {
    color: '#555',
    fontSize: 14,
  },
  categoryTextSelected: {
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  postButtonDisabled: {
    backgroundColor: '#a0c4e4',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddPostScreen;