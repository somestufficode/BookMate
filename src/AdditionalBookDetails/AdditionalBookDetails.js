import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdditionalBookDetails = ({ navigation }) => {
  // State variables to manage user selections
  const [bookPartnerCount, setBookPartnerCount] = useState('');
  const [meetingFrequency, setMeetingFrequency] = useState('');

  const handleBookPartner = () => {
    // Navigate to the screen for selecting book partner frequency
    navigation.navigate('BookClubFrequency');
  };

  const handleBookClub = () => {
    // Navigate to the screen for selecting book club size
    navigation.navigate('BookClubSize');
  };

  const handleSubmit = () => {
    console.log('Book partner count:', bookPartnerCount);
    console.log('Meeting frequency:', meetingFrequency);
  };

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