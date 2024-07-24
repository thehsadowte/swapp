import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Character} from '../types';

type CharacterDetailRouteProp = RouteProp<
  {CharacterDetail: {character: Character}},
  'CharacterDetail'
>;

const CharacterDetailScreen = () => {
  const route = useRoute<CharacterDetailRouteProp>();
  const {character} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Name:</Text>
          <Text style={styles.tableCellValue}>{character.name}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Height:</Text>
          <Text style={styles.tableCellValue}>{character.height}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Mass:</Text>
          <Text style={styles.tableCellValue}>{character.mass}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Gender:</Text>
          <Text style={styles.tableCellValue}>{character.gender}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Birth Year:</Text>
          <Text style={styles.tableCellValue}>{character.birth_year}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Eye Color:</Text>
          <Text style={styles.tableCellValue}>{character.eye_color}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Hair Color:</Text>
          <Text style={styles.tableCellValue}>{character.hair_color}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellLabel}>Skin Color:</Text>
          <Text style={styles.tableCellValue}>{character.skin_color}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCellLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCellValue: {
    flex: 2,
  },
});

export default CharacterDetailScreen;
