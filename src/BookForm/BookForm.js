import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Implement the searchBooks function to search for books
    const searchBooks = async () => {
      try {
        setIsSearching(true);
        if (searchTerm === '') {
          setSearchResults([]);
          setIsSearching(false);
          return;
        }
        const apiKey = 'AIzaSyDN5R0GHTM6PXsT9QzM8p1JToNsY-IKYi8';
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items) {
          setSearchResults(data.items);
        } else {
          setSearchResults([]);
        }
        setIsSearching(false);
      } catch (error) {
        console.error('Error searching for books:', error);
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchBooks, 300); // Debounce the search to avoid making too many requests while typing
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleBookSelection = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a book..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {isSearching && <Text style={styles.loadingText}>Searching...</Text>}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBookSelection(item)}>
            <View style={styles.dropdownItem}>
              <Text>{item.volumeInfo.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderRadius: 20,
  },
  loadingText: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default SearchPage;
