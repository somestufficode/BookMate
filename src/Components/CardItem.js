import React, { memo, useMemo } from 'react';
import {
    ImageBackground,
    ImageProps,
    StyleProp,
    Image,
    StyleSheet,
    Text,
    useWindowDimensions,
    ViewProps,
    ViewStyle, 
    TouchableOpacity,
    View
 } from "react-native";
import { useNavigation } from '@react-navigation/native';
import defaultThumbnail from '../../assets/icon.png'; 
// import { ScreenStackHeaderRightView } from 'react-native-screens';

const CardItem = ({ card }) => {
    const { title, photo, userId, author, description } = card;
    // const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const navigation = useNavigation();
    
    const handleImagePress = () => {
        // Navigate to the user's profile screen and pass the book item's data
        navigation.navigate('UserProfile', { userId: card.userId });
      };
  // Memoized container style
//   const containerStyle = useMemo(() => [styles.container, { 
//     width: screenWidth - 300, // Adjust the width of the container
//     height: (screenWidth - 100) * (2/3), // Adjust the height of the container
//     borderRadius: 10, 
// }], [screenWidth]);

  return (
    <TouchableOpacity onPress={handleImagePress}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={photo ? { uri: photo } : defaultThumbnail}
                resizeMode="contain"
            />
        </View>
        <View style={styles.textContainer}>
                    <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{description}</Text>
                    <View style={styles.titleAuthorContainer}>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.author}>{author}</Text>
                    </View>

        </View>

    </View>
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
        shadowOpacity: 0.5,
        shadowRadius: 4,
        padding: 30,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items at the top
    },
    imageContainer: {
        width: 80,
        height: 100,
        overflow: 'hidden',
        borderRadius: 10,
        marginRight: 10,
        positon: 'relative',
        top: 0,
        right: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,

    },
    titleAuthorContainer: {
        marginTop: 10, // Aligns to the bottom
        // bottom: 0,
        // right: 10,
        // position: 'absolute',
        // justifyContent: 'center'
        // alignSelf: 'flex-start', // Aligns to the start (left) of the parent container
        // paddingTop: 10, // Add padding to separate from the content above
    },
    image: {
        width: '100%',
        height: '100%',
        top: 0,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        color: 'black',
        marginBottom: 5,
        // textShadowColor: 'black',
        // textShadowOffset: { height: 1, width: 0 },
        // textShadowRadius: 1,
    },
    author: {
        fontSize: 15,
        color: 'black',
        marginBottom: 5,
        // textShadowColor: 'black',
        // textShadowOffset: { height: 1, width: 0 },
        // textShadowRadius: 1,
    },
    description: {
        fontSize: 15,
        color: 'black',
        // textAlign: 'right',
        textShadowColor: 'black',
        textShadowOffset: { height: 1, width: 0 },
        textShadowRadius: 1,
    }
});

export default CardItem;

