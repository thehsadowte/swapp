import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CharacterListScreen from '../screens/CharacterListScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import {RootStackParamList} from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CharacterList"
        component={CharacterListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{title: 'Character Detail'}}
      />
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{title: 'Favorites'}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
