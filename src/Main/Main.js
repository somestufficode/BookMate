import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../store/actions';

const Main = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleNext = () => {
    if (currentIndex < Object.values(books).length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const bookIds = Object.keys(books);
  const currentBookId = bookIds[currentIndex];
  const currentBook = books[currentBookId];

  return (
    <View style={styles.container}>
      {currentBook && currentBook.selectedBook && ( // Check if currentBook and selectedBook are defined
        <View style={styles.card}>
          <Image source={{ uri: currentBook.selectedBook.volumeInfo.imageLinks.thumbnail }} style={styles.bookImage} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentBook.selectedBook.volumeInfo.title}</Text>
            <Text style={styles.author}>By {currentBook.selectedBook.volumeInfo.authors.join(', ')}</Text>
            <Text style={styles.blurb}>{currentBook.blurb}</Text>
            <Text style={styles.description}>{currentBook.selectedBook.volumeInfo.description}</Text>
            {/* Add additional book information here */}
          </View>
        </View>
      )}
      <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.previousButton]}>
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
 };  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    margin: 10,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blurb: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  previousButton: {
    left: 10,
    bottom: 20,
  },
  nextButton: {
    right: 10,
    bottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Main;
