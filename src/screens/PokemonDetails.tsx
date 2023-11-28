import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetCardById } from "../hooks/useGetCardById";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getTypeColor, getTypeImage} from "../utils/typeUtils";
import { LinearGradient } from 'expo-linear-gradient';
import { Modal } from 'react-native';
import { useGetAllCards } from "../hooks/useGetAllCards";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  PokemonDetails: { pokedexId: number } | undefined;
};

export default function App() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { pokedexId } = route.params as { pokedexId: number }
    const { data, isFetching } = useGetCardById(pokedexId);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleNavigateToPokemonList = () => {
      navigation.navigate("PokemonList" as never);
    };

    const handleOpenModal = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const { data: allCards } = useGetAllCards();

    // const findCurrentPokemonIndex = () => {
    //   return allCards.findIndex(card => card.pokedexId === pokedexId);
    // };

    const handleNavigateToPreviousPokemon = () => {
      if (allCards) {
        const currentIndex = allCards.findIndex(card => card.pokedexId === pokedexId);
        console.log(currentIndex)
        const PreviousIndex = (currentIndex - 1 + allCards.length) % allCards.length;
        const PreviousPokemonId = allCards[PreviousIndex].pokedexId;
    
        // Utilisez le type approprié attendu par navigation.navigate
        const PreviousPokemonParams: { pokedexId: number } = { pokedexId: PreviousPokemonId };
        console.log(PreviousPokemonParams)
        navigation.navigate("PokemonDetails", PreviousPokemonParams);
      }
    };   

    const handleNavigateToNextPokemon = () => {
      if (allCards) {
        const currentIndex = allCards.findIndex(card => card.pokedexId === pokedexId);
        const NextIndex = (currentIndex + 1 + allCards.length) % allCards.length;
        const NextPokemonId = allCards[NextIndex].pokedexId;
    
        // Utilisez le type approprié attendu par navigation.navigate
        const NextPokemonParams: { pokedexId: number } = { pokedexId: NextPokemonId };
        navigation.navigate("PokemonDetails", NextPokemonParams);
      }
    };  

  
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.goback} onPress={handleNavigateToPokemonList}>
          <Image source={require("../assets/arrow_back.png")} />
        </Pressable>
        <Image style={styles.user} source={require("../assets/user.png")} />

        {isFetching ? (
          <ActivityIndicator />
        ) : data ? (
          <>
          <ImageBackground
            source={{uri: data.sprites.regular}}
            style={styles.spriteBackground}
            blurRadius={50}
          />
            <LinearGradient
            colors={['transparent', '#000']}
            end={[0.4, 0.75]}
            style={{ height: '100%', width: '100%', position: 'absolute' }}>
            </LinearGradient>
            <Image 
                source={getTypeImage(data.types[0].name)} 
                style={styles.cardbackground} 
              />
            <Image
                style={styles.sprite}
                source={{ uri: data.sprites.regular }}
              />
            <View style={styles.details}>
              <Text style={styles.title}>{data.name.en}</Text>
              <Text style={styles.backtitle}>{data.name.en}</Text>
              <View style={styles.typesContainer}>
                {data.types.map((type) => (
                  <View style={styles.type} key={type.name}>
                    <Image
                      source={{ uri: type.image }}
                      style={styles.styleimage}
                    />
                    <Text>{type.name}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu maximus dolor. In vitae massa eget libero ullamcorper finibus a a lacus. Integer pharetra quam metus.
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewstats} onPress={handleOpenModal}>
                  View Stats
                </Text>
              </TouchableOpacity>
              <Pressable style={styles.vectorRight} onPress={handleNavigateToNextPokemon}>
                <Image source={require('../assets/vectorRight.png')} />
                <Image source={require('../assets/arrowRight.png')} style={styles.arrowRight} />
              </Pressable>
              <Pressable style={styles.vectorLeft} onPress={handleNavigateToPreviousPokemon}>
                <Image source={require('../assets/vectorLeft.png')} />
                <Image source={require('../assets/arrowLeft.png')} style={styles.arrowLeft} />
              </Pressable>

              <View style={styles.barToSelectPokemon}>
                <Image
                  source={require('../assets/barToSelectPokemon.png')}
                />
                <Image
                  source={require('../assets/arrowsUp.png')}
                  style={styles.arrowsUp}
                />
                <Image
                  source={require('../assets/pokeball.png')}
                  style={styles.pokeball}
                />
              </View>

              <Text style={styles.textToSelect}>Swipe up to select</Text>

              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalCenter}>
                    {/* Contenu de votre modal */}
                    <Text style={styles.modalText}>🚧 Coming Soon... 🚧</Text>
                    {/* Ajoutez un bouton pour fermer la modal */}
                    <TouchableOpacity  onPress={handleCloseModal} style={styles.closeModal}>
                      <Image source={require('../assets/close.png')} style={styles.cross}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

            </View>
          </>
        ) : (
          <Text>No data available</Text>
        )}
      </SafeAreaView>
    );
  }
  


const styles = StyleSheet.create({
  sprite: {
    position: "absolute",
    top: -10,
    zIndex: 1,
    width: '100%',
    height: '45%',
  },
  title: {
    // position: "absolute",
    top: '45%',
    zIndex: 2,
    width: 182,
    height: 44,
    fontSize: 35,
    color: "white",
    fontWeight: '600',
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    zIndex: 3,
    backgroundColor: '#343434',
    width: 345,
    height: 100,
    borderWidth: 2,
    borderRadius: 11,
    border: 'solid',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 650,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  goback: {
    backgroundColor: "#373737",
    width: 48,
    height: 48,
    borderRadius: 9,
    position: "absolute",
    top: "6%",
    left: "4%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  user: {
    zIndex: 2,
    width: 48,
    height: 48,
    borderRadius: 9,
    position: "absolute",
    top: "6%",
    left: "84%",
  },
  backtitle: {
    position: "absolute",
    top: '25%',
    zIndex: 1,
    width: '170%',
    height: 123,
    fontSize: 100,
    color: "#1B1B1B",
    fontWeight: "700",
    textAlign: "center",
  },
  typesContainer: {
    marginTop: '30%',
    flexDirection: "row",
    zIndex: 3,
    // justifyContent: 'space-between',
    // marginTop: 'auto',
  },
  type: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 6,
    borderRadius: 70,
    backgroundColor: "grey",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  styleimage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginRight: 5,
  },
  description: {
    top: '5%',
    color: 'white',
    width: 350,
    lineHeight: 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  viewstats: {
    color: '#FFB444',
    textDecorationLine: 'underline',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginTop: '30%',
  },
  details: {
    height: 230,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  spriteBackground: {
    position: "absolute",
    top: -150,
    width: '100%',
    height: '100%',
  },
  
  cardbackground: {
    position: "absolute",
    top: 20,
    width: 400,
    height: 400,
  },
  vectorRight: {
    position: 'absolute',
    bottom: '-120%',
    right: '-4%',
    alignItems: 'center',
  },
  vectorLeft: {
    position: 'absolute',
    bottom: '-120%',
    left: '-4%',
    alignItems: 'center',
  },
  arrowRight: {
    position: 'relative',
    bottom: '50%',
  },
  arrowLeft: {
    position: 'relative',
    bottom: '50%',
  },
  barToSelectPokemon: {
    bottom: '30%',
  },
  textToSelect: {
    color: 'white',
    bottom: '35%',
  },
  arrowsUp: {
    position: 'absolute',
    bottom: '40%',
    left: '9%',
    width: '5%',
    height: '50%',
  },
  pokeball: {
    position: 'absolute',
    bottom: '10%',
    left: '2.8%',
    width: 70,
    height: 70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    color: 'black',
    fontSize: 24,
  },
  modalCenter: {
    backgroundColor: 'white',
    height: '50%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModal: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cross: {
    width: '5%',
    height: '5%',
  }
  
});
