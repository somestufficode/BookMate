import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const Main = () => {
  const [cards, setCards] = useState([
    { id: 1, imageUrl: 'https://example.com/image1.jpg' },
    { id: 2, imageUrl: 'https://example.com/image2.jpg' },
    // Add more cards as needed
  ]);

  const handleSwipeLeft = () => {
    // Handle logic for swiping left
  };

  const handleSwipeRight = () => {
    // Handle logic for swiping right
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image source={{ uri: card.imageUrl }} style={styles.cardImage} />
          </View>
        )}
        onSwipedLeft={handleSwipeLeft}
        onSwipedRight={handleSwipeRight}
        cardIndex={0}
        stackSize={3}
        stackScale={10}
        stackSeparation={14}
        useViewOverflow={Platform.OS === 'ios'}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSwipeLeft} style={[styles.button, styles.dislikeButton]}>
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSwipeRight} style={[styles.button, styles.likeButton]}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardImage: {
    flex: 1,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  dislikeButton: {
    backgroundColor: '#E5566D',
  },
  likeButton: {
    backgroundColor: '#4CCC93',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Main;
