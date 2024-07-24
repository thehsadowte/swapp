import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {fetchCharacters} from '../services/api';
import {Character} from '../types';
import CharacterTable from '../components/CharactersTable';
import {useFavorites} from '../context/FavouritesContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Colors} from '../constants/colors';

const CharacterListScreen = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    votes,
    resetFavorites,
  } = useFavorites();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters(page);
        setCharacters(data.characters);
        setTotal(data.total);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      }
    };

    loadCharacters();
  }, [page]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters(
        characters.filter(character =>
          character.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery, characters]);

  const isFavorite = (name: string) => {
    return favorites.some(fav => fav.name === name);
  };

  const handleFavoritePress = (name: string) => {
    const character = characters.find(c => c.name === name);
    if (character) {
      if (isFavorite(name)) {
        removeFromFavorites(character);
      } else {
        addToFavorites(character);
      }
    }
  };

  const handleRowPress = (name: string) => {
    const character = characters.find(c => c.name === name);
    if (character) {
      navigation.navigate('CharacterDetail', {character});
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page * 10 < total) setPage(page + 1);
  };

  const handleNavigateToFavorites = () => {
    navigation.navigate('Favourites');
  };

  const itemsStart = (page - 1) * 10 + 1;
  const itemsEnd = Math.min(page * 10, total);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fans</Text>
        <TouchableOpacity onPress={resetFavorites} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Fans</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fanContainer}>
        <View style={styles.favouritesCard}>
          <Text style={styles.cardCount}>{votes.male}</Text>
          <Text style={styles.cardTitle}>Male</Text>
        </View>
        <View style={styles.favouritesCard}>
          <Text style={styles.cardCount}>{votes.female}</Text>
          <Text style={styles.cardTitle}>Female</Text>
        </View>
        <View style={styles.favouritesCard}>
          <Text style={styles.cardCount}>{votes.other}</Text>
          <Text style={styles.cardTitle}>Other</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <CharacterTable
        data={filteredCharacters.map(character => ({
          name: character.name,
          gender: character.gender,
        }))}
        onFavoritePress={handleFavoritePress}
        isFavorite={isFavorite}
        onRowPress={handleRowPress}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={handleNavigateToFavorites}
          style={styles.favoritesButton}>
          <Text style={styles.favoritesButtonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePreviousPage} disabled={page === 1}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={24}
            color={page === 1 ? Colors.grey : Colors.black}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          {itemsStart}-{itemsEnd} of {total}
        </Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={page * 10 >= total}>
          <FontAwesomeIcon
            icon={faArrowRight}
            size={24}
            color={page * 10 >= total ? Colors.grey : Colors.black}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.appBgcolor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearButton: {
    borderColor: Colors.heart,
    borderWidth: 0.7,
    borderRadius: 5,
    padding: 8,
  },
  clearButtonText: {
    color: Colors.heart,
    fontWeight: 'bold',
  },
  fanContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  favouritesCard: {
    padding: 8,
    height: 80,
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.black,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  pageInfo: {
    fontSize: 16,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  favoritesButton: {
    borderColor: Colors.heart,
    borderWidth: 0.7,
    borderRadius: 5,
    padding: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoritesButtonText: {
    color: Colors.heart,
    fontWeight: 'bold',
  },
});

export default CharacterListScreen;
