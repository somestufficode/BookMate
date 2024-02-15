// BookPartnerFrequency.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookClubFrequency = ({ route, navigation }) => {
  const [selectedFrequency, setFrequency] = useState('');

  const { selectedBook, bookClub, bookPartner, clubSize } = route.params || {};

  const handleFrequencySelection = (selectedFrequency) => {
    setFrequency(selectedFrequency);
    console.log(selectedFrequency);

    navigation.navigate('BookBlurb', {
      selectedBook: selectedBook,
      bookClub: bookClub,
      bookPartner: bookPartner,
      clubSize: clubSize,
      selectedFrequency: selectedFrequency 
    });
  };


  useEffect(() => {
    console.log('Selected Book on Club Freq:', selectedBook);
}, [selectedBook]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Frequency</Text>
      <TouchableOpacity style={styles.frequencyButton} onPress={() => handleFrequencySelection('Once a week')}>
        <Text style={styles.frequencyButtonText}>Once a Week</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.frequencyButton} onPress={() => handleFrequencySelection('Twice a week')}>
        <Text style={styles.frequencyButtonText}>Twice a Week</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.frequencyButton} onPress={() => handleFrequencySelection('More than twice a week')}>
        <Text style={styles.frequencyButtonText}>More than Twice a Week</Text>
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
  frequencyButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  frequencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookClubFrequency;
