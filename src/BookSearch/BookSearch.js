import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchBooks = async () => {
    try {
      const apiKey = 'AIzaSyDN5R0GHTM6PXsT9QzM8p1JToNsY-IKYi8';
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`;

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

  return (
    <View>
      <TextInput
        placeholder="Enter book title"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Search" onPress={searchBooks} />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.volumeInfo.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BookSearch;
