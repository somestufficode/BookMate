import React, { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, View } from 'react-native';

const BookBlurb = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [blurb, setBlurb] = useState('');

  const { selectedBook, bookClub, bookPartner, clubSize, selectedFrequency } = route.params || {};

  const handleChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    setBlurb(inputValue);
    navigation.navigate('FinalBookForm', {
        selectedBook: selectedBook,
        bookClub: bookClub,
        bookPartner: bookPartner,
        clubSize: clubSize,
        selectedFrequency: selectedFrequency, 
        blurb: inputValue
    });
  };
  
  useEffect(()=> {
    console.log('this is blurb:', blurb);
    console.log('Selected Book on Blurb:', selectedBook);
  }, [blurb])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleChange}
        placeholder="Write a brief description..."
        multiline
        numberOfLines={4}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default BookBlurb;
