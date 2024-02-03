import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const BookForm = () => {
  const [title, setTitle] = useState('');

  const createProfile = async (uid) => {
    try {
        await database().ref(`/users/${uid}`).set({ name });
    } catch (error) {
        console.error('Error creating user profile:', error);
    }
}


  const handleSubmit = async () => {
    try {
      await database().ref(`/users/uid/`)collection('books').add({
        title: title,
        // Add other fields
      });
      console.log('Book added successfully!');
      // You can navigate or show a success message here
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  return (
    <View>
      <Text>Title:</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Enter book title"
      />
      {/* Add other input fields for book details */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default BookForm;
