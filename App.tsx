import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, View } from 'react-native';

// Importing screens
import HomePage from './screens/homepage';
import CategoriesPage from './screens/categoriespage';
import FirstCategory from './screens/FirstCategory';
import SecondCategoryy from './screens/SecondCategoryy';
import AdminPanel from './screens/AdminPanel';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ImageBackground
      source={require('./assets/images/bg_img2.jpg')} 
      style={styles.background} 
      resizeMode="cover"
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
         <Stack.Screen
  name="Home"
  component={HomePage}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="Categories"
  component={CategoriesPage}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="FirstCategory"
  component={FirstCategory}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="SecondCategoryy"
  component={SecondCategoryy}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="AdminPanel"
  component={AdminPanel}
  options={{ headerShown: false }}
/>
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensure background covers the whole screen
    width: '100%',
    height: '100%',
  },
});

export default App;