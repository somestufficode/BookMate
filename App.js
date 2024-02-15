// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookForm from './src/BookForm/BookForm';
import BookDetailsPage from './src/BookDetails/BookDetails';
import AdditionalBookDetails from './src/AdditionalBookDetails/AdditionalBookDetails';
// import BookSearch from './src/BookSearch/BookSearch';
import Register from './src/Register/Register';
import Main from './src/Main/Main';
import BookClubSize from './src/BookClubSize/BookClubSize';
import BookClubFrequency from './src/BookClubFrequency/BookClubFrequency';
import BookBlurb from './src/BookBlurb/BookBlurb';
import FinalBookForm from './src/FinalBookForm/FinalBookForm';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store/store'; // Import your Redux store

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BookForm" component={BookForm} />
        <Stack.Screen name="BookDetails" component={BookDetailsPage} />
        <Stack.Screen name="AdditionalBookDetails" component={AdditionalBookDetails} />
        {/* <Stack.Screen name="BookSearch" component={BookSearch} /> */}
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="BookClubSize" component={BookClubSize} />
        <Stack.Screen name="BookClubFrequency" component={BookClubFrequency} />
        <Stack.Screen name="BookBlurb" component={BookBlurb} />
        <Stack.Screen name="FinalBookForm" component={FinalBookForm} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
