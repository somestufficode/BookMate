import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/Register/Register';
import Main from './src/Main/Main';
import BookForm from './src/BookForm/BookForm';
import BookSearch from './src/BookSearch/BookSearch';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="BookSearch" component={BookSearch} />
                <Stack.Screen name="BookForm" component={BookForm} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
