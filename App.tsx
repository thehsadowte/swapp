import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {FavoritesProvider} from './src/context/FavouritesContext';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
