// BookDetailsPage.js
import React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const BookDetailsPage = ({ route }) => {
    const navigation = useNavigation();

    const { book } = route.params || {}; 

    if (!book || !book.volumeInfo) {
        return <Text>Loading...</Text>; 
      }
    
    const { title, authors, description, imageLinks } = book.volumeInfo;

    const handleAddBook = () => {
        navigation.navigate('AdditionalBookDetails');
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{authors && authors[0]}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageLinks && imageLinks.thumbnail }} style={styles.image} />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
                <Text style={styles.addButtonLabel}>Add Book</Text>
        </TouchableOpacity>

        </ScrollView>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    author: {
        marginBottom: 10,
    },
    description: {
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    addButtonLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 150,
    },
});


export default BookDetailsPage;
