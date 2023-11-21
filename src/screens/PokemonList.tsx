import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetAllCards } from '../hooks/useGetAllCards';
import { getTypeColor } from '../utils/typeUtils';

export default function App() {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Home' as never);
  };

  const { data, isFetching } = useGetAllCards();

  if (isFetching) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.goback} onPress={handleNavigateToHome}>
        <Image source={require('../assets/arrow_back.png')} />
      </Pressable>
      <Image style={styles.user} source={require('../assets/user.png')} />
      <Image
        style={styles.backgroundpoke}
        source={require('../assets/background.png')}
      />
      <Text style={styles.normaltext}>Select Your</Text>
      <Text style={styles.boldtext}>
        Pokemon{''}
        <Image source={require('../assets/pokeball.png')} style={styles.pokeball} />
      </Text>
      <Text style={styles.pokemonnumber}>
        {isFetching ? 'Loading...' : `${data?.length} Pokemons in your Pokedex`}
      </Text>
      <ScrollView style={styles.scrollview}>
        {Array.isArray(data) ? (
          data.map((card) => (
            <View style={[
              styles.pokemoncard,
              { backgroundColor: getTypeColor(card.types[0].name) },
            ]} key={card.pokedexId}>
              <Image
                source={{ uri: card.sprites.regular }}
                style={styles.pokemonsprite}
              />
              <Text style={styles.pokemonname}>{card.name.en}</Text>
              <View style={styles.typesContainer}>
                {card.types.map((type, index) => (
                  <View style={styles.type} key={index}>
                    <Image
                      source={{ uri: type.image }}
                      style={styles.styleimage}
                    />
                    <Text>{type.name}</Text>
                  </View>
                ))}
              </View>

            </View>
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundpoke: {
    position: 'absolute',
    top: '18%',
    left: '-30%',
    width: '110%',
    height: '60%',
  },
  goback: {
    backgroundColor: '#373737',
    width: 48,
    height: 48,
    borderRadius: 9,
    position: 'absolute',
    top: '4%',
    left: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    width: 48,
    height: 48,
    borderRadius: 9,
    position: 'absolute',
    top: '4%',
    left: '84%',
  },
  normaltext: {
    fontSize: 35.88,
    fontWeight: '300',
    color: '#FFFFFF',
    position: 'absolute',
    top: '16%',
    left: '4%',
  },
  boldtext: {
    fontSize: 47.83,
    fontWeight: '600',
    color: '#FFFFFF',
    position: 'absolute',
    top: '21%',
    left: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  pokeball: {
    width: 60,
    height: 60,
  },
  pokemonnumber: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '400',
    color: '#FFFFFF',
    position: 'absolute',
    left: '4%',
    top: '80%',
    width: '35%',
  },
  scrollview: {
    width: '100%',
    height: '80%',
    color: '#FFFFFF',
    zIndex: 2,
    position: 'absolute',
    top: '30%',
    left: '39%',
  },
  pokemoncard: {
    width: 374,
    height: 250,
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 12,
    overflow: 'visible',
  },
  pokemonname: {
    marginTop: 'auto',
    fontWeight: '600',
    fontSize: 30,
  },
  pokemonsprite: {
    width: 250,
    height: 250,
    overflow: 'visible',
    position: 'relative',
    top: -100,
    right: -50,
  },
  typesContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 'auto',
  },
  type: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 6,
    borderRadius: 70,
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 6,
    opacity: 0.8,
  },
  styleimage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginRight: 5,
  }
});
