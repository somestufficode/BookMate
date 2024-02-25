import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchBooks, logout } from '../../store/actions'; // assuming this is where you define your fetchBooks action
import CardItem from '../Components/CardItem';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth module


const Main = () => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  // const state = useSelector(state => state);

  const user = useSelector(state => state.user);
  
  // console.log('state right now:', stated)
  console.log('main user:', user)


  useEffect(() => {
    dispatch(fetchBooks());
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Update isLoggedIn state based on user presence
    });
    // Clean up subscription
    return unsubscribe;
  }, [dispatch]);

  // const navigateToUserProfile = () => {
  //   navigation.navigate('UserProfile'); // Replace 'UserProfile' with the actual name of your user profile screen
  // };

  const handleLogout = async () => {
    try {
        await auth().signOut(); // Sign out the current user
        // Navigate to the login page or any other desired screen
        // navigation.navigate('Login');
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

  // const handleNext = () => {
  //   if (currentIndex < Object.values(books).length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  const navigateToBookForm = () => {
    navigation.navigate('BookForm');
  };

  // const handlePrevious = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  const handleSearch = (searchTerm) => {
    // Implement search functionality here
    console.log('Search term:', searchTerm);
  };

  const handleFilter = (genre) => {
    // Implement filter functionality here
    console.log('Filter by genre:', genre);
  };


  // const handlePhotoPress = () => {
  //   const currentBookId = Object.keys(books)[currentIndex];
  //   const currentBook = books[currentBookId];
  //   if (currentBook && currentBook.user) {
  //     // Handle navigation or rendering user info
  //     console.log('User info:', currentBook.user);
  //   }
  // };

  // const bookIds = Object.keys(books);
  // const currentBookId = bookIds[currentIndex];
  // const currentBook = books[currentBookId];

  // const isCardItemRendered = currentBook &&
  //   currentBook.selectedBook &&
  //   currentBook.selectedBook.volumeInfo.imageLinks &&
  //   currentBook.selectedBook.volumeInfo.imageLinks.thumbnail;

    const renderBookItems = () => {
      return Object.values(books).map((book, index) => (
        <View style={styles.bookItemContainer} key={index}>
        <TouchableOpacity key={index} onPress={() => handleBookPress(book.id)}>
          {book.selectedBook && book.selectedBook.volumeInfo && book.selectedBook.volumeInfo.imageLinks && (
            <CardItem
              card={{
                title: book.selectedBook.volumeInfo.title,
                photo: book.selectedBook.volumeInfo.imageLinks.thumbnail,
                userId: book.userId, 
                author: book.selectedBook.volumeInfo.authors[0],
                description: book.selectedBook.volumeInfo.description,
              }}
            />
          )}
        </TouchableOpacity>
        </View>
      ));
    };

  // console.log("this is the current book:", currentBook)

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => handleFilter('Fantasy')} style={styles.filterButton}>
          <Text style={styles.buttonText}>Filter by Genre</Text>
        </TouchableOpacity>
        {/* {isCardItemRendered && (
          <CardItem card={{ title: currentBook.selectedBook.volumeInfo.title, photo: currentBook.selectedBook.volumeInfo.imageLinks.thumbnail, userId: currentBook.userId }} />
        )} */}
        {/* <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.previousButton]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> */}
        {renderBookItems()}

        <Button title="Add Book" onPress={navigateToBookForm} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};  

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',
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
  bookItemContainer: {
    marginBottom: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
  },  
  // bookItemImage: {
  //   width: '100%',
  //   height: 150,
  //   resizeMode: 'cover',
  // },
  // bookItemTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   padding: 10,
  //   textAlign: 'center',
  // },
});


export default Main;