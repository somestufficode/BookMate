import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdditionalBookDetails = ({ route, navigation }) => {
  const [bookPartner, setBookPartner] = useState(false);
  const [bookClub, setBookClub] = useState(false);

  const { selectedBook } = route.params || {};

  const handleBookPartner = () => {
    setBookPartner(true);
    setBookClub(false);
    navigation.navigate('BookClubFrequency', {
        selectedBook: route.params.selectedBook,
        bookPartner: true,
        bookClub: false
    });
  };

  const handleBookClub = () => {
    setBookClub(true);
    setBookPartner(false);
    navigation.navigate('BookClubSize', {
        selectedBook: route.params.selectedBook,
        bookClub: true,
        bookPartner: false
    });
  };

  useEffect(() => {
    console.log('Selected Book on Additional:', selectedBook);
    console.log('Book Partner:', bookPartner);
    console.log('Book Club:', bookClub);
  }, [selectedBook, bookPartner, bookClub]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Option</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleBookPartner}>
        <Text style={styles.optionButtonText}>Find a Book Partner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={handleBookClub}>
        <Text style={styles.optionButtonText}>Start a Book Club</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdditionalBookDetails;