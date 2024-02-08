// BookClubSize.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookClubSize = ({ navigation }) => {
    
    const handleClubSizeSelection = (size) => {
        // Navigate to the frequency component with the selected club size
        navigation.navigate('BookClubFrequency', { clubSize: size });
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Club Size</Text>
      <TouchableOpacity style={styles.sizeButton} onPress={() => handleClubSizeSelection('3-5 members')}>
        <Text style={styles.sizeButtonText}>3-5 Members</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeButton} onPress={() => handleClubSizeSelection('5-10 members')}>
        <Text style={styles.sizeButtonText}>5-10 Members</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sizeButton} onPress={() => handleClubSizeSelection('10-20 members')}>
        <Text style={styles.sizeButtonText}>10-20 Members</Text>
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
  sizeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  sizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookClubSize;
