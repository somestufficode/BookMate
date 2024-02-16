import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleNext = () => {
    if (currentIndex < Object.values(books).length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const navigateToBookForm = () => {
    navigation.navigate('BookForm');
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePhotoPress = () => {
    const currentBookId = Object.keys(books)[currentIndex];
    const currentBook = books[currentBookId];
    if (currentBook && currentBook.user) {
      // Handle navigation or rendering user info
      console.log('User info:', currentBook.user);
    }
  };

  const bookIds = Object.keys(books);
  const currentBookId = bookIds[currentIndex];
  const currentBook = books[currentBookId];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {currentBook && currentBook.selectedBook && (
          <TouchableOpacity onPress={handlePhotoPress} style={styles.imageContainer}>
            <Image source={{ uri: currentBook.selectedBook.volumeInfo.imageLinks.thumbnail }} style={styles.bookImage} />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          {currentBook && currentBook.selectedBook && (
            <>
              <Text style={styles.title}>{currentBook.selectedBook.volumeInfo.title}</Text>
              <Text style={styles.author}>By {currentBook.selectedBook.volumeInfo.authors.join(', ')}</Text>
              <Text style={styles.description}>{currentBook.selectedBook.volumeInfo.description}</Text>
            </>
          )}
        </View>
        <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.previousButton]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <Button title="Add Book" onPress={navigateToBookForm} />
      </View>
    </ScrollView>
  );
};  

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'flex-start', // Start from left
    alignItems: 'flex-start', // Align items from top
    paddingHorizontal: 20, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
  },
  imageContainer: {
    alignItems: 'center',
  },
  bookImage: {
    width: 120, // Adjust image width
    height: 180, // Adjust image height
    resizeMode: 'cover',
    marginRight: 10, // Add margin between image and text
  },
  textContainer: {
    maxHeight: 180, // Maximum height for the text container
    flex: 1, // Fill remaining space
  },
  title: {
    fontSize: 18, // Decrease font size for title
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blurb: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  author: {
    fontSize: 16, // Decrease font size for author
    marginBottom: 5,
  },
  button: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  previousButton: {
    left: 20,
    bottom: 20,
  },
  nextButton: {
    right: 20,
    bottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Main;
