import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Character} from '../types';

interface Votes {
  male: number;
  female: number;
  other: number;
}

interface FavoritesContextProps {
  favorites: Character[];
  votes: Votes;
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (character: Character) => void;
  resetFavorites: () => void;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  votes: {male: 0, female: 0, other: 0},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  resetFavorites: () => {},
});

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [votes, setVotes] = useState<Votes>({male: 0, female: 0, other: 0});

  const updateVotes = (character: Character, increment: boolean) => {
    setVotes(prevVotes => {
      const delta = increment ? 1 : -1;
      if (character.gender.toLowerCase() === 'male') {
        return {...prevVotes, male: prevVotes.male + delta};
      } else if (character.gender.toLowerCase() === 'female') {
        return {...prevVotes, female: prevVotes.female + delta};
      } else {
        return {...prevVotes, other: prevVotes.other + delta};
      }
    });
  };

  const addToFavorites = (character: Character) => {
    setFavorites(prevFavorites => [...prevFavorites, character]);
    updateVotes(character, true);
  };

  const removeFromFavorites = (character: Character) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(fav => fav.name !== character.name),
    );
    updateVotes(character, false);
  };

  const resetFavorites = () => {
    setFavorites([]);
    setVotes({male: 0, female: 0, other: 0});
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        votes,
        addToFavorites,
        removeFromFavorites,
        resetFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
