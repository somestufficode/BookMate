import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure, setCurrentUser, setUser } from '../../store/actions';


export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    // const state = useSelector(state => state); // Get the entire state
    // console.log('Current State at Login:', state);
    const login = async () => {
        if (email && password) {
            try {
                // Attempt to sign in with email and password
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                console.log("user:",userCredential.user)
                console.log("cred", userCredential)

                 
                        // Extract necessary user information
                        const user = {
                            email: userCredential.user.email,
                            displayName: userCredential.user.displayName,
                            phoneNumber: userCredential.user.phoneNumber,
                            photoURL: userCredential.user.photoURL,
                            uid: userCredential.user.uid,
                            // Add any other necessary fields
                        };

                    // Dispatch setUser action with extracted user data
                    dispatch(setUser(user));
        
                // Navigate to the desired screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });  
                    } catch (error) {
                // Handle login failure
                console.error('Error logging in:', error);
                Alert.alert('Oops', 'Invalid email or password. Please try again.');
            }
        } else {
            Alert.alert('Validation Error', 'Email and password are required');
        }
    };

    // useEffect(() => {
    //     const unsubscribe = auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log(user)
    //             dispatch({ type: 'SET_USER', payload: user });
    //         } else {
    //             console.log('where is:', user)
    //             dispatch({ type: 'SET_USER', payload: null });
    //         }
    //     });
    //     return unsubscribe;
    // }, [dispatch]);

    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
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
                onPress={login}
                style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginBottom: 10 }}
            >
                <Text style={{ color: 'white' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')} // Navigate to the Register component
                style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}
            >
                <Text style={{ color: 'white' }}>Create an Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
