import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async (text) => {
    try {
      setSearchTerm(text); 

      if (text === '') {
        setSearchResults([]); 
        return;
      }

      const apiKey = 'AIzaSyDN5R0GHTM6PXsT9QzM8p1JToNsY-IKYi8';
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${text}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.items) {
        setSearchResults(data.items);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };
  

  const handleBookSelection = (book) => {
    setSelectedBook(book);
    console.log('Selected book:', book); 
  };

  return (
    <View>
      <TextInput
        placeholder="Enter book title"
        value={searchTerm}
        onChangeText={searchBooks} // Trigger searchBooks function on text change
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBookSelection(item)}>
              <View>
                <Text>{item.volumeInfo.title}</Text>
              </View>
            </TouchableOpacity>
          )}
      />
    </View>
  );
};

export default BookSearch;
