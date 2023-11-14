import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetAllCards } from '../hooks/useGetAllCards';


export default function App() {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Home' as never);
  };

  const { data, isFetching } = useGetAllCards();

  if (isFetching) {
    return <ActivityIndicator />
  }


  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.goback} onPress={handleNavigateToHome}>
          <Image source={require('../assets/arrow_back.png')} />
        </TouchableOpacity>
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
            data
            .map((card) => (
              <View style={styles.pokemoncard} key={card.pokedexId}>
                <Text>
                  {card.name.en} 
                </Text>
                <Text>
                  {card.pokedexId}
                </Text>
                <Image
                  source={{ uri: card.sprites.regular }} // Utilisez l'URL de l'image ici
                  style={{ width: 100, height: 100 }} // Ajustez la taille selon vos besoins
                />
                <Text>
                  {''}
                  <Image 
                    source={{ uri: card.types[0].image }}
                    style={{ width: 30, height: 30 }}
                  />
                  { card.types[0].name }
                </Text>
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
    top: '18%', // Utilisation de pourcentage plutôt que de valeur absolue
    left: '-30%', // Utilisation de pourcentage plutôt que de valeur absolue
    // zIndex: 1,
    width: '110%', // Utilisation de pourcentage plutôt que de valeur absolue
    height: '60%', // Utilisation de pourcentage plutôt que de valeur absolue
  },
  goback: {
    backgroundColor: '#373737',
    width: 48,
    height: 48,
    borderRadius: 9,
    position: 'absolute',
    top: '4%', // Utilisation de pourcentage plutôt que de valeur absolue
    left: '4%', // Utilisation de pourcentage plutôt que de valeur absolue
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    width: 48,
    height: 48,
    borderRadius: 9,
    position: 'absolute',
    top: '4%', // Utilisation de pourcentage plutôt que de valeur absolue
    left: '84%', // Utilisation de pourcentage plutôt que de valeur absolue
  },
  normaltext: {
    fontSize: 35.88, // Utilisez simplement le nombre pour définir la taille de la police
    // fontFamily: 'clash-display', // Assurez-vous que le nom de la police est correctement défini dans votre application
    fontWeight: '300', // Utilisez une chaîne pour définir le poids de la police
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
    alignContent: 'flex-start'
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
    // backgroundColor: '#373737'
  },
  pokemoncard: {
    width: 374,
    height: 299,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'column',
  }
});
