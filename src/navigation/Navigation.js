// Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home'; // Assuming your Home screen is in the screens folder
import PokemonList from '../screens/PokemonList';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PokemonList"
          component={PokemonList} // Make sure PokemonList is a valid React component
          options={{
            title: 'Pokemon List',
            headerShown: false,
          }}
        />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
