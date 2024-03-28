import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchBooks, logout } from '../../store/actions'; // Assuming this is where you define your fetchBooks action
import auth from '@react-native-firebase/auth'; // Import Firebase Auth module
// import CardItem from '../Components/CardItem';
import Carousel from 'react-native-snap-carousel'; // Import Carousel from react-native-snap-carousel


const MainDiscovery = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchBooks());
    const unsubscribe = auth().onAuthStateChanged(user => {
      // Handle user authentication state changes
    });
    return unsubscribe; // Clean up subscription
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    // Implement search functionality here
    console.log('Search term:', searchTerm);
  };

  const handleFilter = (genre) => {
    // Implement filter functionality here
    console.log('Filter by genre:', genre);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out the current user
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });   
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors that occur during the logout process
    }
  };
  
  const handleBookPress = (book) => {
    navigation.navigate('UserProfile', { userId: book.userId });
  }

  const renderBookItems = () => {
    const bookArray = Object.values(books);
    const pairs = [];
    for (let i = 0; i < bookArray.length; i += 2) {
      pairs.push(bookArray.slice(i, i + 2));
    }
    return pairs.map((pair, index) => (
      <View key={index} style={styles.bookPairContainer}>
        {pair.map((book, bookIndex) => (
          <TouchableOpacity key={bookIndex} style={styles.bookItemContainer} onPress={() => handleBookPress(book)}>
            <Image
              style={styles.bookItemImage}
              source={{ uri: book.selectedBook.volumeInfo.imageLinks.thumbnail }}
              resizeMode="cover" // Adjust the resizeMode for better image quality
            />
            <View style={styles.bookItemOverlay}>
              <Text style={styles.bookItemTitle}>{book.selectedBook.volumeInfo.title}</Text>
              <Text style={styles.bookItemAuthor}>{book.selectedBook.volumeInfo.authors[0]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title, author, genre, or location"
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => handleFilter('Fantasy')} style={styles.filterButton}>
          <Text style={styles.buttonText}>Filter by Genre</Text>
        </TouchableOpacity>

        {/* Carousel of BookItems */}
        <ScrollView horizontal pagingEnabled style={styles.carouselContainer}>
          {renderBookItems()}
        </ScrollView>

        <Button title="Add Book" onPress={() => navigation.navigate('BookForm')} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  carouselContainer: {
    flexDirection: 'row',
  },
  bookPairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bookItemContainer: {
    width: '55%', // Adjust the width to fit two books in a row
    marginHorizontal: 5,
    alignItems: 'center',
  },
  bookItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  bookItemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bookItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  bookItemAuthor: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

export default MainDiscovery;