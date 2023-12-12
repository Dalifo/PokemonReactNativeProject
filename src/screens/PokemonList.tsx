import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from "@react-navigation/native";
import { useGetAllCards } from "../hooks/useGetAllCards";
import { getTypeColor, getTypeImage } from "../utils/typeUtils";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { useState } from "react";

type RootStackParamList = {
  PokemonDetails: { pokedexId: number } | undefined;
};

export default function App() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [previousActive, setPreviousActive] = useState<number>(0);
  const [nextActive, setNextActive] = useState<number | undefined>(2);


  const handleNavigateToHome = () => {
    navigation.navigate("Home" as never);
  };

  const handleNavigateToPokemonDetails = (pokedexId: number) => {
    console.log({ pokedexId });
    navigation.navigate("PokemonDetails", { pokedexId });
  };

  const { data, isFetching } = useGetAllCards();

  const [fontsLoaded] = useFonts({
    ClashDisplaySemibold: require('../assets/fonts/ClashDisplay-Semibold.otf'),
    ClashDisplayLight: require('../assets/fonts/ClashDisplay-Light.otf'),
    ClashDisplayRegular: require('../assets/fonts/ClashDisplay-Regular.otf'),
    ClashDisplayMedium: require('../assets/fonts/ClashDisplay-Medium.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (isFetching) {
    return <ActivityIndicator />;
  }

  const handleSnapToItem = (index: number) => {
    setActiveSlide(index);
    setPreviousActive(index - 1);
    setNextActive(index + 1 < (data?.length ?? 0) ? index + 1 : undefined);
  };
  

  console.log("Active index:", activeSlide);
  console.log("Previous index:", previousActive ?? null);
  console.log("Next index:", nextActive ?? null);

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
        Pokèmon{""}
        <Image
          source={require("../assets/pokeball.png")}
          style={styles.pokeball}
        />
      </Text>
      <Text style={styles.pokemonnumber}>
        {isFetching ? "Loading..." : `${data?.length} Pokemons in your Pokedex`}
      </Text>
      <Carousel
        data={data ?? []}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleNavigateToPokemonDetails(item.pokedexId)}
          >
         <View
            style={[
              styles.pokemoncard,
              { 
                backgroundColor: getTypeColor(item.types[0].name),
                opacity: 1,
                zIndex: activeSlide === index ? 2 : 1,
                
                transform: [
                  { rotate: index === previousActive ? "15deg" : (index === nextActive ? "-15deg" : "0deg") },
                  { scale: index === activeSlide ? 1 : 0.9 },
                  { translateX: index === previousActive ? 50 : (index === nextActive ? 50 : 0) },
                ],
              },
            ]}
          >
            <Image 
              source={getTypeImage(item.types[0].name)} 
              style={styles.cardbackground} 
            />
            <Image
              source={{ uri: item.sprites.regular }}
              style={styles.pokemonsprite}
            />
            <Text style={styles.pokemonname}>{item.name.en}</Text>
            <View style={styles.typesContainer}>
              {item.types.map((type) => (
                <View style={styles.type} key={type.name}>
                  <Image
                    source={{ uri: type.image }}
                    style={styles.styleimage}
                  />
                  <Text style={styles.typeName}>{type.name}</Text>
                </View>
              ))}
            </View>              
          </View>


          </Pressable>
        )}
        sliderHeight={400}
        itemHeight={250}
        firstItem={1}
        vertical
        // layout="default"
        activeSlideAlignment="end"
        inactiveSlideOpacity={1}
        
        containerCustomStyle={{ 
          left: '25%',
          top: '32%',
          overflow: 'visible'
        }}
        onSnapToItem={handleSnapToItem}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "120%",
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
    fontFamily: 'ClashDisplayLight'
  },
  boldtext: {
    fontSize: 47.83,
    fontWeight: "600",
    color: "#FFFFFF",
    position: "absolute",
    top: "20%",
    left: "4%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "flex-start",
    fontFamily: 'ClashDisplaySemibold',
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
    fontFamily: 'ClashDisplayRegular',
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
    fontFamily: 'ClashDisplaySemibold',
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
  typeName: {
    fontFamily: 'ClashDisplayMedium',
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