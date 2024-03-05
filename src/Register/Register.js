import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { updateProfile } from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions'; 
import database from '@react-native-firebase/database';

export const Register = ({ navigation }) => {
    const [displayName, setDisplayName] = useState(''); // Update state variable name to setDisplayName
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch(); // Get dispatch function from Redux

    const createProfile = async (uid) => {
        try {
            await database().ref(`/users/${uid}`).set({ displayName, email });
        } catch (error) {
            console.error('Error creating user profile:', error);
        }
    }
    const registerAndGoToMainFlow = async () => {
        if (email && password) { 
            try {
                const response = await auth().createUserWithEmailAndPassword(
                    email,
                    password
                );

                // const currentUser = response.user;
    
                if (response.user) {
                    // Update user's profile with display name
                    // await updateProfile(auth().currentUser, {
                    //     displayName: displayName, 
                    //     // photoURL: "https://example.com/jane-q-user/profile.jpg"
                    //   })
                    // await firebase.auth().currentUser.updateProfile({
                    //     displayName: 'Alias',
                    //   });
    
                    console.log("this si teh response user", response.user)
    
                    // Create user profile in database
                    await createProfile(response.user.uid, displayName, email);
    
                    console.log(displayName);
                    // Extract necessary user information
                    const user = {
                        email: response.user.email,
                        name: displayName, // Use the displayName from the component state
                        uid: response.user.uid,
                        // Add any other necessary fields
                    };
    
                    console.log('this si user:', user)
    
                    // Dispatch setUser action with extracted user data
                    dispatch(setUser(user));
    
                    // Navigate to the main screen
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainSearch' }],
                    });
                }
            } catch (error) {
                console.error('Error registering user:', error);
                Alert.alert('Oops', 'Please check your form and try again');
            }
        } else {
            Alert.alert('Validation Error', 'Email, password, and display name are required');
        }
    };
    
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Register</Text>
            <TextInput
                placeholder="Name"
                value={displayName}
                onChangeText={text => setDisplayName(text)} 
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <TouchableOpacity
                onPress={registerAndGoToMainFlow}
                style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            >
                <Text style={{ color: 'white' }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
