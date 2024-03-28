import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import database from '@react-native-firebase/database';

const UserProfile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [numColumns, setNumColumns] = useState(2); // Number of columns in the grid

  const { width: screenWidth } = useWindowDimensions();
  const { userId } = route.params;


  const secureUrl = (url) => {
    if (url && url.startsWith('http://')) {
        return url.replace('http://', 'https://');
    }
    return url;
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userDataSnapshot, userBooksSnapshot] = await Promise.all([
          database().ref(`users/${userId}`).once('value'),
          database().ref('books').orderByChild('userId').equalTo(userId).once('value')
        ]);

        const userData = userDataSnapshot.val();
        const userBooksData = userBooksSnapshot.val();

        setUserData(userData);
        setUserBooks(userBooksData ? Object.values(userBooksData) : []);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserData();
  }, [userId]);

  const containerStyle = useMemo(() => [styles.container, { width: screenWidth - 16 * 2 }], [screenWidth]);

  const toggleBookDetails = (index) => {
    if (selectedBookIndex === index) {
      setSelectedBookIndex(null);
    } else {
      setSelectedBookIndex(index);
    }
  };

  const keyExtractor = (item, index) => `${item}-${index}-${numColumns}`; // Unique key based on numColumns

  if (loading) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.userProfile}>
        {/* User Profile Image Container */}
        {/* <Image
          style={styles.userProfileImage}
          source={{ uri: userData.profileImageUrl }}
        > */}
          {/* Additional user info */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData.displayName}</Text>
            {/* Additional user info like bio, follow option, direct message option */}
            {/* Add your UI elements here */}
          </View>
        {/* </Imagea> */}
      </View>
      <FlatList
        data={userBooks}
        numColumns={numColumns} // Display books in a grid
        showsVerticalScrollIndicator={false} 
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => toggleBookDetails(index)}
          >
           <View style={[styles.imageContainer]}>
              <Image
                style={styles.image}
                source={{ uri: secureUrl(item.selectedBook.volumeInfo.imageLinks.thumbnail) }}
                resizeMode="contain"
              />
            </View>
            {selectedBookIndex === index && (
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.selectedBook.volumeInfo.title}</Text>
                <Text style={styles.bookAuthor}>{item.selectedBook.volumeInfo.authors[0]}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={keyExtractor} // Use unique keyExtractor function
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userInfo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    lineHeight: 50, 
    fontWeight: 'bold',
  },
  bookItem: {
    // flex: 1,
    // margin: 5,
    borderRadius: 10,
    marginRight: -20,
    marginBottom: 20,
    overflow: 'hidden',
    // elevation: 3,
    width: 180, // Set a fixed width for each book item
    height: 180, // Set a fixed height for each book item
    },
    imageContainer: {
        width: 200,
        height: 180,
        overflow: 'hidden',
        borderRadius: 10,
        positon: 'relative',
        top: 0,
        right: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,

    },
    image: {
        width: 200,
        height: 175,
        top: 0,
        resizeMode: 'contain',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
  bookDetails: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  bookAuthor: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
});

export default UserProfile;
