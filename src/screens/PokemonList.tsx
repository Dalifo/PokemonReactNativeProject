import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetAllCards } from "../hooks/useGetAllCards";
import { getTypeColor, getTypeImage } from "../utils/typeUtils";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  PokemonDetails: { pokedexId: number } | undefined;
};

export default function App() {
  const animatedScrollY = useSharedValue(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigateToHome = () => {
    navigation.navigate("Home" as never);
  };

  const handleNavigateToPokemonDetails = (pokedexId: number) => {
    console.log({pokedexId})
    navigation.navigate("PokemonDetails", {pokedexId});
  };
  
  const { data, isFetching } = useGetAllCards();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    animatedScrollY.value = event.contentOffset.y;
  });

  const animatedStyle = useAnimatedStyle(() => {
    console.log(animatedScrollY.value);
    const rotate = interpolate(animatedScrollY.value, [0, 100], [0, 5]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  

  if (isFetching) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.goback} onPress={handleNavigateToHome}>
        <Image source={require("../assets/arrow_back.png")} />
      </Pressable>
      <Image style={styles.user} source={require("../assets/user.png")} />
      <Image
        style={styles.backgroundpoke}
        source={require("../assets/background.png")}
      />
      <Text style={styles.normaltext}>Select Your</Text>
      <Text style={styles.boldtext}>
        Pokemon{""}
        <Image
          source={require("../assets/pokeball.png")}
          style={styles.pokeball}
        />
      </Text>
      <Text style={styles.pokemonnumber}>
        {isFetching ? "Loading..." : `${data?.length} Pokemons in your Pokedex`}
      </Text>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scrollview}
      >
        {Array.isArray(data) ? (
          data.map((card) => (
            <Pressable
              key={card.pokedexId}
              onPress={() => handleNavigateToPokemonDetails(card.pokedexId)}
            >
              <Animated.View
                style={[
                  styles.pokemoncard,
                  { backgroundColor: getTypeColor(card.types[0].name) },
                  animatedStyle,
                ]}
              >
                <Image 
                  source={getTypeImage(card.types[0].name)} 
                  style={styles.cardbackground} 
                />
                <Image
                  source={{ uri: card.sprites.regular }}
                  style={styles.pokemonsprite}
                />
                <Text style={styles.pokemonname}>{card.name.en}</Text>
                <View style={styles.typesContainer}>
                  {card.types.map((type) => (
                    <View style={styles.type} key={type.name}>
                      <Image
                        source={{ uri: type.image }}
                        style={styles.styleimage}
                      />
                      <Text>{type.name}</Text>
                    </View>
                  ))}
                </View>              
                </Animated.View>
            </Pressable>
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundpoke: {
    position: "absolute",
    top: "18%",
    left: "-30%",
    width: "110%",
    height: "60%",
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
  },
  user: {
    width: 48,
    height: 48,
    borderRadius: 9,
    position: "absolute",
    top: "6%",
    left: "84%",
  },
  normaltext: {
    fontSize: 35.88,
    fontWeight: "300",
    color: "#FFFFFF",
    position: "absolute",
    top: "16%",
    left: "4%",
  },
  boldtext: {
    fontSize: 47.83,
    fontWeight: "600",
    color: "#FFFFFF",
    position: "absolute",
    top: "21%",
    left: "4%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  pokeball: {
    width: 60,
    height: 60,
  },
  pokemonnumber: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "400",
    color: "#FFFFFF",
    position: "absolute",
    left: "4%",
    top: "80%",
    width: "35%",
  },
  scrollview: {
    width: "100%",
    height: "80%",
    color: "#FFFFFF",
    zIndex: 2,
    position: "absolute",
    top: "30%",
    left: "39%",
    overflow: 'visible'
  },
  pokemoncard: {
    width: 374,
    height: 250,
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "column",
    padding: 12,
    overflow: "visible",
  },
  pokemonname: {
    marginTop: "auto",
    fontWeight: "600",
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  pokemonsprite: {
    width: 250,
    height: 250,
    overflow: "visible",
    position: "relative",
    top: -100,
    right: -50,
    zIndex: 2,
  },
  typesContainer: {
    flexDirection: "row",
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
    opacity: 0.8,
  },
  styleimage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginRight: 5,
  },
  cardbackground: {
    zIndex: 1,
    position: "absolute",
    top: 20,
    width: '50%',
    height:'70%',
  }
});
