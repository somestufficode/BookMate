import React, { memo, useMemo } from 'react';
import {
    ImageBackground,
    ImageProps,
    StyleProp,
    StyleSheet,
    Text,
    useWindowDimensions,
    ViewProps,
    ViewStyle, 
    TouchableOpacity
 } from "react-native";
import { useNavigation } from '@react-navigation/native';
import defaultThumbnail from '../../assets/icon.png'; 

const CardItem = ({ card }) => {
    const { title, photo, userId } = card;
    const { width: screenWidth } = useWindowDimensions();
    const navigation = useNavigation();
    
    const handleImagePress = () => {
        // Navigate to the user's profile screen and pass the book item's data
        navigation.navigate('UserProfile', { userId: card.userId });
      };
  // Memoized container style
  const containerStyle = useMemo(() => [styles.container, { width: screenWidth - 16 * 2 }], [screenWidth]);

  return (
    <TouchableOpacity onPress={handleImagePress}>
    <ImageBackground style={containerStyle} source={photo ? { uri: photo } : defaultThumbnail}>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);
};

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    aspectRatio: 1,
    justifyContent: 'flex-end',
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 1,
  },
});

export default memo(CardItem);
