import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookForm from './src/BookForm/BookForm';
import BookDetailsPage from './src/BookDetails/BookDetails';
import AdditionalBookDetails from './src/AdditionalBookDetails/AdditionalBookDetails';
// import BookSearch from './src/BookSearch/BookSearch';
import Register from './src/Register/Register';
import MainSearch from './src/Main/MainSearch';
import BookClubSize from './src/BookClubSize/BookClubSize';
import BookClubFrequency from './src/BookClubFrequency/BookClubFrequency';
import BookBlurb from './src/BookBlurb/BookBlurb';
import FinalBookForm from './src/FinalBookForm/FinalBookForm';
import Login from './src/Login/Login';
import { Provider } from 'react-redux';
import store from './store/store'; 
import UserProfile from './src/UserProfile/UserProfile';
// import MainDiscovery from './src/MainDiscover/MainDiscover';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainSearch" component={MainSearch} />
        <Stack.Screen name="BookForm" component={BookForm} />
        <Stack.Screen name="BookDetails" component={BookDetailsPage} />
        <Stack.Screen name="AdditionalBookDetails" component={AdditionalBookDetails} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BookClubSize" component={BookClubSize} />
        <Stack.Screen name="BookClubFrequency" component={BookClubFrequency} />
        <Stack.Screen name="BookBlurb" component={BookBlurb} />
        <Stack.Screen name="FinalBookForm" component={FinalBookForm} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
