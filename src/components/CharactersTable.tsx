import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartOutlined} from '@fortawesome/free-regular-svg-icons';

import {Colors} from '../constants/colors';

interface CharacterTableProps {
  data: {name: string; gender: string}[];
  onFavoritePress: (name: string) => void;
  isFavorite: (name: string) => boolean;
  onRowPress: (name: string) => void;
}

const CharacterTable: React.FC<CharacterTableProps> = ({
  data,
  onFavoritePress,
  isFavorite,
  onRowPress,
}) => {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.cellHeader}>Name</Text>
        <Text style={styles.cellHeader}>Gender</Text>
        <Text style={styles.cellHeader}>Favorite</Text>
      </View>
      {data.map((character, index) => (
        <TouchableOpacity
          key={index}
          style={styles.row}
          onPress={() => onRowPress(character.name)}>
          <Text style={styles.cell}>{character.name}</Text>
          <Text style={styles.cell}>{character.gender}</Text>
          <TouchableOpacity onPress={() => onFavoritePress(character.name)}>
            <FontAwesomeIcon
              icon={isFavorite(character.name) ? faHeartSolid : faHeartOutlined}
              size={20}
              color={Colors.heart}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    alignItems: 'center',
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
  },
});

export default CharacterTable;
