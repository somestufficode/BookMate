import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Button, ImageBackground, useWindowDimensions, StyleSheet } from 'react-native';
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

  // const handlePhotoPress = () => {
  //   const currentBookId = Object.keys(books)[currentIndex];
  //   const currentBook = books[currentBookId];
  //   if (currentBook && currentBook.user) {
  //     // Handle navigation or rendering user info
  //     console.log('User info:', currentBook.user);
  //   }
  // };

  const bookIds = Object.keys(books);
  const currentBookId = bookIds[currentIndex];
  const currentBook = books[currentBookId];

  const isCardItemRendered = currentBook &&
    currentBook.selectedBook &&
    currentBook.selectedBook.volumeInfo.imageLinks &&
    currentBook.selectedBook.volumeInfo.imageLinks.thumbnail;


  // console.log("this is the current book:", currentBook)

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      {isCardItemRendered && (
        <CardItem card={{ title: currentBook.selectedBook.volumeInfo.title, photo: currentBook.selectedBook.volumeInfo.imageLinks.thumbnail, userId: currentBook.userId }} />
      )}
        {/* <View style={styles.textContainer}>
          {currentBook && currentBook.selectedBook && (
            <>
              <Text style={styles.title}>{currentBook.selectedBook.volumeInfo.title}</Text>
              <Text style={styles.author}>By {currentBook.selectedBook.volumeInfo.authors.join(', ')}</Text>
              <Text style={styles.description}>
                {currentBook.selectedBook.volumeInfo.description || 'No Description Available'}
              </Text>
            </>
          )}
        </View> */}
        <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.previousButton]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={[styles.button, styles.nextButton]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <Button title="Add Book" onPress={navigateToBookForm} />
        <Button title="Logout" onPress={handleLogout} />
        {/* <TouchableOpacity onPress={navigateToUserProfile} style={styles.button}>
          <Text style={styles.buttonsText}>View User Profile</Text>
        </TouchableOpacity> */}
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
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bookImage: {
    width: 200,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  author: {
    fontSize: 18,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  previousButton: {
    backgroundColor: 'blue',
  },
  nextButton: {
    backgroundColor: 'green',
  },
  profileButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonsText: {
    color: 'black',
    fontSize: 18,
  },
});

export default Main;
