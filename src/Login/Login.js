import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure, setCurrentUser, setUser } from '../../store/actions';


export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const user  = useSelector(state => state.user);
  
    console.log('user right now at login:', user)
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

    const loginWithDemoUser = async () => {
        // Log in with the provided demo user credentials
        const demoUserEmail = 'demo@user.io';
        const demoUserPassword = 'password';

        try {
            const userCredential = await auth().signInWithEmailAndPassword(demoUserEmail, demoUserPassword);
            console.log("user:", userCredential.user);

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
            console.error('Error logging in with demo user:', error);
            Alert.alert('Oops', 'Failed to log in with demo user.');
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
                onPress={() => navigation.navigate('Register')} 
                style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginBottom: 10}}
            >
                <Text style={{ color: 'white' }}>Create an Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={loginWithDemoUser} 
                style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginBottom: 10 }}
            >
                <Text style={{ color: 'white' }}>Demo User</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
