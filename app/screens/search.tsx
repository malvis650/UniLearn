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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type SearchResult = {
  id: string;
  type: 'course' | 'professor' | 'material';
  title: string;
  subtitle: string;
  image?: any;
  rating?: number;
  enrolled?: number;
};

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState([
    'Computer Science 101',
    'Prof. Johnson',
    'Linear Algebra',
  ]);

  // Sample search results data
  const searchResults: SearchResult[] = [
    {
      id: '1',
      type: 'course',
      title: 'Introduction to Computer Science',
      subtitle: 'CS 101 - Fall 2023',
      image: require('@/assets/images/course.jpeg'),
      rating: 4.7,
      enrolled: 1245,
    },
    {
      id: '2',
      type: 'professor',
      title: 'Dr. Sarah Johnson',
      subtitle: 'Computer Science Department',
      image: require('@/assets/images/professor.jpg'),
      rating: 4.9,
    },
    {
      id: '3',
      type: 'material',
      title: 'Linear Algebra Textbook',
      subtitle: 'Mathematics Resources',
      rating: 4.5,
    },
    {
      id: '4',
      type: 'course',
      title: 'Advanced Mathematics',
      subtitle: 'MATH 301 - Spring 2023',
      image: require('@/assets/images/account.jpg'),
      rating: 4.6,
      enrolled: 876,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'courses', label: 'Courses' },
    { id: 'professors', label: 'Professors' },
    { id: 'materials', label: 'Materials' },
  ];

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultCard}>
      {item.image && (
        <Image source={item.image} style={styles.resultImage} />
      )}
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
        <View style={styles.resultMeta}>
          {item.rating && (
            <View style={styles.metaItem}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.metaText}>{item.rating}</Text>
            </View>
          )}
          {item.enrolled && (
            <View style={styles.metaItem}>
              <Ionicons name="people" size={16} color="#3498db" />
              <Text style={styles.metaText}>{item.enrolled.toLocaleString()}</Text>
            </View>
          )}
          <Text style={styles.resultType}>
            {item.type === 'course' ? 'Course' : 
             item.type === 'professor' ? 'Professor' : 'Material'}
          </Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#aaa" />
    </TouchableOpacity>
  );

  const renderRecentSearch = (search: string) => (
    <TouchableOpacity 
      style={styles.recentSearchItem}
      onPress={() => setSearchQuery(search)}
    >
      <MaterialIcons name="history" size={20} color="#888" />
      <Text style={styles.recentSearchText}>{search}</Text>
      <TouchableOpacity 
        style={styles.removeSearchButton}
        onPress={() => setRecentSearches(recentSearches.filter(s => s !== search))}
      >
        <Ionicons name="close" size={18} color="#888" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={24} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses, professors, materials..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={20} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
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

      {/* Search Content */}
      {searchQuery.length === 0 ? (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.length > 0 ? (
            <View style={styles.recentSearchesList}>
              {recentSearches.map((search, index) => (
                <View key={index}>
                  {renderRecentSearch(search)}
                  {index < recentSearches.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No recent searches</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={searchResults.filter(result => 
            activeFilter === 'all' || 
            (activeFilter === 'courses' && result.type === 'course') ||
            (activeFilter === 'professors' && result.type === 'professor') ||
            (activeFilter === 'materials' && result.type === 'material')
          )}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.resultsContainer}
          ListEmptyComponent={
            <View style={styles.emptyResults}>
              <Feather name="search" size={50} color="#ddd" />
              <Text style={styles.emptyResultsText}>No results found</Text>
              <Text style={styles.emptyResultsSubtext}>Try different keywords</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    paddingHorizontal: 5,
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
  recentSearchesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  recentSearchesList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  recentSearchText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  removeSearchButton: {
    padding: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 45,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  resultsContainer: {
    padding: 15,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metaText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#555',
  },
  resultType: {
    fontSize: 13,
    color: '#3498db',
    fontWeight: '500',
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyResultsText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
    fontWeight: '500',
  },
  emptyResultsSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default SearchScreen;