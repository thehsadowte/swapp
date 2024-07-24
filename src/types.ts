export type RootStackParamList = {
  CharacterList: undefined;
  CharacterDetail: {character: Character};
  Favourites: undefined;
};

export interface Character {
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  height: string;
  mass: string;
}
