import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Main from '../Main/Main';

export const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createProfile = async (uid) => {
        try {
            await database().ref(`/users/${uid}`).set({ name });
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

                if (response.user) {
                    await createProfile(response.user.uid);
                    navigation.navigate('Main');
                }
            } catch (error) {
                console.error('Error registering user:', error);
                Alert.alert('Oops', 'Please check your form and try again');
            }
        } else {
            Alert.alert('Validation Error', 'Email and password are required');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Register</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
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