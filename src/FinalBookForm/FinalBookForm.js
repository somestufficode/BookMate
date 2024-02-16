import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';


const FinalBookForm = ({ route }) => {

    const { selectedBook, bookClub, bookPartner, clubSize, blurb, selectedFrequency } = route.params || {};
    const currentUser = useSelector(state => state.user);
    const navigation = useNavigation();
    // const state = useSelector(state => state); // Get the entire state
    // console.log('Current State at FinalBookForm:', state);

  const handleSubmit = async() => {
    // Process the form data, e.g., send it to Firebase
    const formData = {

      selectedBook,
      bookClub, 
      bookPartner,
      selectedFrequency,
      clubSize,
      blurb,
      // Add other form fields as needed
    };

    console.log('Form data:', formData);

    // how do i make sure that the id for the book is consistent for both database pushes
    await database().ref('books').push(formData);
    await database().ref(`users/${currentUser.id}/books`).push(formData);

    navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
    });    

  };

  useEffect(() => {
    // console.log('this is:', clubFrequency);
    console.log('this is not:', selectedFrequency);
    console.log('this:', bookClub);
    console.log('this partner:', bookPartner);
    console.log('this partner club:', clubSize);
  })


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Book:</Text>
      <Text style={styles.text}>{selectedBook.volumeInfo.title}</Text>
      {bookClub && (
        <>
          <Text style={styles.title}>BookClub:</Text>
          <Text style={styles.text}>Book Club</Text>
        </>
      )}
      {bookPartner && (
        <>
          <Text style={styles.title}>BookPartner:</Text>
          <Text style={styles.text}>Book Partner</Text>
        </>
      )}
      <Text style={styles.title}>Club Frequency:</Text>
      <Text style={styles.text}>{selectedFrequency}</Text>
      {bookClub && (
        <>
          <Text style={styles.title}>Club Size:</Text>
          <Text style={styles.text}>{clubSize}</Text>
        </>
      )}
      <Text style={styles.title}>Blurb:</Text>
      <Text style={styles.text}>{blurb}</Text>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#ffffff', // Optional: Add a background color for better readability
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#dddddd', // Optional: Add a border color for better separation
      marginBottom: 20,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: 25, // Optional: Adjust font size for better visibility
      color: '#333333', // Optional: Adjust text color for better readability
    },
    text: {
        fontSize: 16, // Increased font size for text
        marginBottom: 10, // Adjusted spacing between text elements
      },
  });
    

export default FinalBookForm;
