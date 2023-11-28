import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import PokemonList from '../screens/PokemonList';
import PokemonDetails from '../screens/PokemonDetails';

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
          component={PokemonList}
          options={{
            title: 'Pokemon List',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails} 
          options={{
            title: 'Pokemon Details',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
