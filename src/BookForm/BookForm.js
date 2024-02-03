import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      if (!user) {
        console.log('User not signed in. Cannot add book.');
        return;
      }

      const uid = user.uid;

      // Now you can use 'uid' to reference the current user's identifier
      await database().ref(`/users/${uid}/books`).push({
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
