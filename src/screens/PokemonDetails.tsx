import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useGetCardById } from "../hooks/useGetCardById";
import { useGetAllCards } from "../hooks/useGetAllCards";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import { getTypeImage, getTypeColor, getTypeColorSecondary } from "../utils/typeUtils";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';


type RootStackParamList = {
  PokemonDetails: { pokedexId: number } | undefined;
  Battleground: { pokedexId: number };
};

type GestureContext = {
  startY: number;
};

export default function App() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { pokedexId } = route.params as { pokedexId: number };
  const { data, isFetching } = useGetCardById(pokedexId);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [swipeHandled, setSwipeHandled] = useState<boolean>(false);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const handleNavigateToPokemonList = () => {
    navigation.navigate("PokemonList" as never);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const { data: allCards } = useGetAllCards();

  const handleNavigateToPreviousPokemon = () => {
    if (allCards) {
      const currentIndex = allCards.findIndex((card) => card.pokedexId === pokedexId);
      const PreviousIndex = (currentIndex - 1 + allCards.length) % allCards.length;
      const PreviousPokemonId = allCards[PreviousIndex].pokedexId;

      const PreviousPokemonParams: { pokedexId: number } = { pokedexId: PreviousPokemonId };
      navigation.navigate("PokemonDetails", PreviousPokemonParams);
    }
  };

  const handleNavigateToNextPokemon = () => {
    if (allCards) {
      const currentIndex = allCards.findIndex((card) => card.pokedexId === pokedexId);
      const NextIndex = (currentIndex + 1 + allCards.length) % allCards.length;
      const NextPokemonId = allCards[NextIndex].pokedexId;

      const NextPokemonParams: { pokedexId: number } = { pokedexId: NextPokemonId };
      navigation.navigate("PokemonDetails", NextPokemonParams);
    }
  };

  const onSwipeLeft = () => {
    if (!swipeHandled && allCards) {
      const currentIndex = allCards.findIndex((card) => card.pokedexId === pokedexId);
      const NextIndex = (currentIndex + 1 + allCards.length) % allCards.length;
      const NextPokemonId = allCards[NextIndex].pokedexId;

      const NextPokemonParams: { pokedexId: number } = { pokedexId: NextPokemonId };
      navigation.navigate("PokemonDetails", NextPokemonParams);
      

      setSwipeHandled(true);
    }
  };

  const onSwipeRight = () => {
    if (!swipeHandled && allCards) {
      const currentIndex = allCards.findIndex((card) => card.pokedexId === pokedexId);
      const PreviousIndex = (currentIndex - 1 + allCards.length) % allCards.length;
      const PreviousPokemonId = allCards[PreviousIndex].pokedexId;

      const PreviousPokemonParams: { pokedexId: number } = { pokedexId: PreviousPokemonId };
      navigation.navigate("PokemonDetails", PreviousPokemonParams);
      

      setSwipeHandled(true);
    }
  };

  const resetSwipeHandled = () => {
    setSwipeHandled(false);
  };

  const pokeballStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const spriteStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = Math.max(Math.min(context.startY + event.translationY, 0), -70);
      console.log('Pokeball Position Y:', translateY.value);
    },
    onEnd: () => {
      if (translateY.value != -70){
      translateY.value = 0;
    }
    }
  });
  
  const navigateToBattleground = (pokedexId?: number): void => {
    console.log('Navigating to Battleground with pokedexId:', pokedexId);
    if (pokedexId !== undefined) {
      navigation.navigate("Battleground", { pokedexId });
        setTimeout(() => {
        translateY.value = 0;
      }, 1000);
    }
  };
  
  

  const [fontsLoaded] = useFonts({
    ClashDisplaySemibold: require('../assets/fonts/ClashDisplay-Semibold.otf'),
    ClashDisplayLight: require('../assets/fonts/ClashDisplay-Light.otf'),
    ClashDisplayBold: require('../assets/fonts/ClashDisplay-Bold.otf'),
    ClashDisplayRegular: require('../assets/fonts/ClashDisplay-Regular.otf'),
    ClashDisplayMedium: require('../assets/fonts/ClashDisplay-Medium.otf'),
  });
  if (!fontsLoaded) {
    return null;
  }
    
    return (
      <PanGestureHandler
      onGestureEvent={({ nativeEvent }) => {
        if (nativeEvent.translationX < -50) {
          onSwipeLeft();
        } else if (nativeEvent.translationX > 50) {
          onSwipeRight();
        }
      }}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          resetSwipeHandled();
        }
      }}
    >
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
             <Animated.Image
            style={[styles.sprite, spriteStyle]}
            source={{ uri: data.sprites.regular }}
            onLoad={() => {
              opacity.value = withSpring(1, { damping: 100, stiffness: 10 });
            }}
          />
            <View style={styles.details}>
              <Text style={styles.title}>{data.name.en}</Text>
              <Text style={styles.backtitle}>{data.name.en}</Text>
              <View style={styles.typesContainer}>
                {data.types.map((type) => (
                  <View style={[styles.type,
                    { backgroundColor: getTypeColor(type.name),
                      borderColor: getTypeColorSecondary(type.name),
                     },                  
                  ]} key={type.name}>
                    <Image
                      source={{ uri: type.image }}
                      style={styles.styleimage}
                    />
                    <Text style={[styles.typeName,
                        {color: getTypeColorSecondary(type.name),}
                    ]}>{type.name}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu maximus dolor. 
                In vitae massa eget libero ullamcorper finibus a a lacus. Integer pharetra quam metus.
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewstats} onPress={handleOpenModal}>
                  View Stats
                </Text>
              </TouchableOpacity>
              <View style={styles.vectorRight} >
                <Image source={require('../assets/vectorRight.png')} />
                <Pressable onPress={handleNavigateToNextPokemon} style={styles.arrowRight} >
                  <Image source={require('../assets/arrowRight.png')} />
                </Pressable>
              </View>
              <View style={styles.vectorLeft} >
                <Image source={require('../assets/vectorLeft.png')} />
                <Pressable style={styles.arrowLeft} onPress={handleNavigateToPreviousPokemon}>
                  <Image source={require('../assets/arrowLeft.png')} />
                </Pressable>
              </View>

              <PanGestureHandler 
              onGestureEvent={gestureHandler}
              onHandlerStateChange={({ nativeEvent }) => {
                const { translationY } = nativeEvent;
                if (data && translationY <= -70) {
                  navigateToBattleground(data.pokedexId);
                }
              }}
              >
              <Animated.View style={styles.barToSelectPokemon}>
                  <Image source={require('../assets/barToSelectPokemon.png')} />
                  <Image source={require('../assets/arrowsUp.png')} style={styles.arrowsUp} />
                  <View
                    style={styles.pokeballButton}
                  >
                    <Animated.Image
                      source={require('../assets/pokeball.png')}
                      style={[styles.pokeball, pokeballStyle]}
                    />
                  </View>
                </Animated.View>
              </PanGestureHandler>

              <Text style={styles.textToSelect}>Swipe up to select</Text>

              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
              >
                <View style={styles.modalContainer}>
                  <View style={[styles.modalCenter, {borderColor: getTypeColor(data.types[0].name)}]}>
                    <View style={styles.modalCenterInner}>
                      <Pressable  onPress={handleCloseModal} style={styles.closeModal}>
                        <Image source={require('../assets/close.png')} style={styles.cross}></Image>
                      </Pressable>
                      <Text style={[styles.modalTitle, {color: getTypeColor(data.types[0].name)}]}>Stats</Text>
                      <View>
                      {data.stats && (
                        <View style={styles.allStats}>
                          {Object.entries(data.stats).map(([statName, statValue], statIndex) => (
                            <View key={statIndex} style={styles.statContainer}>
                              <Text style={[styles.statText, {color: getTypeColorSecondary(data.types[0].name)}]}>{statName}</Text>
                              <Text style={[styles.statText, {color: getTypeColorSecondary(data.types[0].name)}]}>{statValue}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>

            </View>
          </>
        ) : (
          <Text>No data available</Text>
        )}
      </SafeAreaView>
    </PanGestureHandler>
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
    top: '45%',
    zIndex: 2,
    height: 44,
    fontSize: 35,
    color: "white",
    fontWeight: '600',
    textAlign: "center",
    fontFamily: 'ClashDisplaySemibold',
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
    color: "#232323",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: 'ClashDisplayBold',
  },
  typesContainer: {
    marginTop: '30%',
    flexDirection: "row",
    zIndex: 3,
  },
  type: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 6,
    borderRadius: 70,
    backgroundColor: "grey",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1, 
    borderColor: "black", 
    borderStyle: 'solid',
  },
  typeName: {
    fontFamily: 'ClashDisplayMedium',
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
    fontFamily: 'ClashDisplayRegular',
  },
  viewstats: {
    color: '#FFB444',
    textDecorationLine: 'underline',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginTop: '5%',
    fontFamily: 'ClashDisplayMedium',
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
    borderRadius: 50,
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
    bottom: '-10%',
  },
  textToSelect: {
    color: 'white',
    fontFamily: 'ClashDisplayMedium',
    bottom: '-5%'
  },
  arrowsUp: {
    position: 'absolute',
    bottom: '42%',
    left: '9%',
    width: '5%',
    height: '50%',
  },
  pokeball: {
    width: 80,
    height: 80,
  },
  pokeballButton: {
    position: 'absolute',
    bottom: '6%',
    left: '1.5%',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCenter: {
    position: 'absolute',
    bottom: '30%',
    backgroundColor: 'white',
    opacity: 0.95,
    height: '23%',
    width: '80%',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
  },  
  modalCenterInner: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'ClashDisplayMedium',
  },
  modalStats: {
    fontFamily: 'ClashDisplayMedium',
    fontSize: 18,
  },
  closeModal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '2%',
    left: '97%',
    zIndex: 2,
  },
  cross: {
    width: '10%',
    height: '10%',
  },
  usernameBar: {
    height: 25,
    width: 10,
    borderRadius: 8,
    marginLeft: 10,
    overflow: 'hidden',
    marginRight: -8,
  },
  allStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between'
  },
  statContainer: {
    marginBottom: 5,
    left: '5%',
    width: '30%',
    alignItems: 'center'
  },
  statText: {
    fontFamily: 'ClashDisplayMedium',
    fontSize: 18,
    marginBottom: 5
  },
});
