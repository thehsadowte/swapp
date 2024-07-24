import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Character} from '../types';
import {Icon} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartOutlined} from '@fortawesome/free-regular-svg-icons';
import {Colors} from '../constants/colors';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
  onFavoritePress: () => void;
  isFavorite: boolean;
  icon?: FontAwesomeIconName;
}
type FontAwesomeIconName = 'heart' | 'heart-o';

const getFontAwesomeIcon = (iconName: FontAwesomeIconName) => {
  switch (iconName) {
    case 'heart-o':
      return faHeartSolid;
    case 'heart':
      return faHeartOutlined;

    default:
      return faHeartSolid;
  }
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onPress,
  onFavoritePress,
  isFavorite,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{character.name}</Text>
          <Text>Gender: {character.gender}</Text>
        </View>
        <TouchableOpacity onPress={onFavoritePress}>
          <FontAwesomeIcon
            icon={getFontAwesomeIcon(isFavorite ? 'heart' : 'heart-o')}
            size={24}
            color={Colors.heart}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heartIcon: {
    marginLeft: 12,
    color: Colors.heart,
  },
});

export default CharacterCard;
