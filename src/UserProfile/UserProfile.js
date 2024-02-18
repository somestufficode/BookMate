import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import database from '@react-native-firebase/database';

const UserProfile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const { width: screenWidth } = useWindowDimensions();
  const { userId } = route.params;

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

  if (loading) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userTitle}>This is: {userData.email}</Text>
      <FlatList
        data={userBooks}
        showsVerticalScrollIndicator={false} 
        renderItem={({ item, index }) => (
          <View style={styles.bookItem}>
            <ImageBackground
              style={[styles.imageContainer, containerStyle]}
              source={{ uri: item.selectedBook.volumeInfo.imageLinks.thumbnail }}
            />
            <Text>Title: {item.selectedBook.volumeInfo.title}</Text>
            <Text>Author: {item.selectedBook.volumeInfo.authors[0]}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default UserProfile;
