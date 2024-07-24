import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import CharacterCard from '../components/CharacterCard';
import {useFavorites} from '../context/FavouritesContext';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList, Character} from '../types';

const FavouritesScreen = () => {
  const {favorites, votes} = useFavorites();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCardPress = (character: Character) => {
    navigation.navigate('CharacterDetail', {character});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text>Total Votes:</Text>
      <Text>Male: {votes.male}</Text>
      <Text>Female: {votes.female}</Text>
      <Text>Other: {votes.other}</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <CharacterCard
            character={item}
            onPress={() => handleCardPress(item)}
            onFavoritePress={() => {}}
            isFavorite={true}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default FavouritesScreen;
