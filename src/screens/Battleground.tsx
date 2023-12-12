import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, ImageBackground, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useGetCardById } from "../hooks/useGetCardById";
import { getTypeColor, getTypeColorSecondary} from "../utils/typeUtils";
import { LinearGradient } from 'expo-linear-gradient';
import { Card, useGetAllCards } from "../hooks/useGetAllCards";
import { useFonts } from "expo-font";
import { shuffle } from 'lodash';

export default function App() {
    const route = useRoute();
    const { pokedexId } = route.params as { pokedexId: number }
    const { data, isFetching } = useGetCardById(pokedexId);

    const { data: allCards } = useGetAllCards();

    const [randomPokemon, setRandomPokemon] = useState<Card | null>(null);
    const [attackSprites, setAttackSprites] = useState<string[]>([]);
    const [selectedAttackIndex, setSelectedAttackIndex] = useState<number | null>(null);

    useEffect(() => {
      if (allCards && allCards.length > 0 && !randomPokemon) {
        const randomIndex = Math.floor(Math.random() * allCards.length);
        setRandomPokemon(allCards[randomIndex]);
      }
    }, [allCards, randomPokemon]);

    useEffect(() => {
      if (data) {
        const sprites = shuffle([
          data.sprites.regular || '',
          data.sprites.shiny || '',
          (data.sprites.gmax?.regular ?? data.sprites.regular) || '',
          (data.sprites.gmax?.shiny ?? data.sprites.shiny) || '',
        ]);

        setAttackSprites(Array.from({ length: 4 }).map((_, index) => {
          const spriteIndex = index % sprites.length;
          return sprites[spriteIndex];
        }));
      }
    }, [data]);

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

    const handleAttackClick = (index: number) => {
      setSelectedAttackIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.barTop}>
            <Text style={styles.battlegroundTitle}>Battleground</Text>
        </View>
        <View style={styles.midbar}></View>
        <Text style={styles.chooseAttack}>Choose Your Attack</Text>

        {isFetching ? (
        <ActivityIndicator />
      ) : data ? (
        <View style={styles.opponents}>
          {allCards && allCards.length > 0 && randomPokemon && (
            <View style={styles.otherPokemon}>
              <View style={styles.blurredBackgroundContainerOther}>
                <ImageBackground
                  source={{ uri: randomPokemon.sprites.regular }}
                  style={styles.spriteBackgroundOtherPokemon}
                  blurRadius={100}
                />
              </View>
              <LinearGradient
                colors={[ getTypeColor(data.types[0].name), getTypeColorSecondary(data.types[0].name)]}
                end={[0.4, 0.75]}
                style={[styles.linearGradient, {left: '-60%'}]}
                ></LinearGradient>
              <Image
                style={styles.spriteOtherPokemon}
                source={{ uri: randomPokemon.sprites.regular }}
              />
              <View style={[styles.username, { left: '15%'}]}>
                <Image style={styles.user} source={require("../assets/opponent.png")} />
                <Text style={[styles.title, {fontFamily: 'ClashDisplayRegular'}]}>{randomPokemon.name.en}</Text>
              </View>
              <View style={styles.usernameBarContainerOther}>
                {[...Array(4).keys()].map((_, index) => (
                  <View key={index} style={[styles.usernameBar, {transform: [{rotate: '15deg'}]}]}>
                    <LinearGradient
                      colors={[getTypeColor(randomPokemon.types[0].name), getTypeColorSecondary(randomPokemon.types[0].name)]}
                      style={styles.barLinearGradient}
                    />
                  </View>
                ))}
                {[...Array(5).keys()].map((_, index) => (
                <View key={index} style={[styles.usernameBar, {transform: [{rotate: '15deg'}]}]}>
                  <LinearGradient
                      colors={['#333333', '#271F1D']}
                      style={styles.barLinearGradient}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
          <View style={styles.vsBox}>
            <Text style={styles.vsText}>V/S</Text>
          </View>
          <View style={styles.yourPokemon}>
            <View style={styles.blurredBackgroundContainerYour}>
              <ImageBackground
                source={{ uri: data.sprites.regular }}
                style={styles.spriteBackgroundYourPokemon}
                blurRadius={100}
              />
            </View>
            <LinearGradient
              colors={[ getTypeColor(data.types[0].name), getTypeColorSecondary(data.types[0].name)]}
              end={[0.4, 0.75]}
              style={[styles.linearGradient, {left: '-20%'}]}
              ></LinearGradient>
            <Image
              style={styles.spriteYourPokemon}
              source={{ uri: data.sprites.regular }}
            />
            <View style={[styles.username, { right: '15%'}]}>
              <Text style={[styles.title, {fontFamily: 'ClashDisplaySemibold'}]}>{data.name.en}</Text>
              <Image style={styles.user} source={require("../assets/user.png")} />
            </View>
            <View style={styles.usernameBarContainerYour}>
                {[...Array(2).keys()].map((_, index) => (
                <View key={index} style={[styles.usernameBar, {transform: [{rotate: '-15deg'}]}]}>
                  <LinearGradient
                      colors={['#333333', '#271F1D']}
                      style={styles.barLinearGradient}
                    />
                  </View>
                ))}
                {[...Array(8).keys()].map((_, index) => (
                <View key={index} style={[styles.usernameBar, {transform: [{rotate: '-15deg'}]}]}>
                  <LinearGradient
                      colors={[getTypeColor(data.types[0].name), getTypeColorSecondary(data.types[0].name)]}
                      style={styles.barLinearGradient}
                    />
                  </View>
                ))}
              </View>
          </View>
          <View style={styles.attacks}>
          {attackSprites.map((sprite, index) => (
            <Pressable
              key={index}
              onPress={() => handleAttackClick(index)}
              style={[
                styles.attack,
                {
                  borderColor: selectedAttackIndex === index ? getTypeColorSecondary(data.types[0].name) : 'transparent',
                  backgroundColor: selectedAttackIndex === index ? getTypeColor(data.types[0].name) : '#222222',
                },
              ]}
            >
                <Image
                  style={styles.attackImage}
                  source={{ uri: sprite }}
                />
                <Text style={[styles.attackText,
                {
                  color: selectedAttackIndex === index ? getTypeColorSecondary(data.types[0].name) : 'white'
                }]}>
                  {data.talents[index % data.talents.length]?.name || ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </SafeAreaView>
  );
}

  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    },
  barTop: {
    position: "absolute",
    top: "6%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
  },
  battlegroundTitle: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'ClashDisplayMedium',
    fontSize: 35,
  },
  yourPokemon:{
    borderRadius: 999,
    width: '35%',
    height: '100%',
  },
  otherPokemon:{
    borderRadius: 100,
    width: '35%',
    height: '100%',    
  },
  opponents: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    top: 80,
  },
  spriteYourPokemon: {
    width: '150%',
    height: '50%',
    left: '-10%',
  },
  blurredBackgroundContainerOther: {
    position: "absolute",
    width: '180%',
    height: '60%',
    left: '-60%',
  },
  blurredBackgroundContainerYour: {
    position: "absolute",
    width: '180%',
    height: '60%',
  },
  spriteOtherPokemon: {
    width: '150%',
    height: '50%',
    left: '-30%',
  },
  username: {
    flexDirection: 'row',
    position: 'absolute',
    top: '58%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },  
  user:{
    borderRadius: 999,
    height: 32,
    width: 32,
  },
  title: {
    height: 22,
    lineHeight: 22,
    fontSize: 15,
    color: "white",
    paddingHorizontal: 6,
  },
  spriteBackgroundYourPokemon: {
    width: '100%',
    height: '100%',
    left: '-11%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  spriteBackgroundOtherPokemon: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  linearGradient: {
    height: '60%', 
    width: '180%', 
    position: 'absolute', 
    borderRadius: 999, 
    opacity: 0.1 
  },
  usernameBarContainerOther: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    top: '60%',
    left: '3%',
    gap: 1,
  },
  usernameBar: {
    height: 25,
    width: 10,
    borderRadius: 8,
    marginLeft: 10,
    overflow: 'hidden',
    marginRight: -8,
  },
  barLinearGradient: {
    flex: 1,
    borderRadius: 8,
  },
  usernameBarContainerYour: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    top: '60%',
    right: '6%',
    gap: 1,
  },
  vsBox: {
    position: 'relative',
    top: -70,
    backgroundColor: '#23232399',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    color: '#757575',
    fontFamily: 'ClashDisplaySemibold',
  },
  midbar:{
    blurRadius: 4,
    width: '100%',
    height: 5,
    backgroundColor: '#333333',
    position: 'absolute',
    top: '50%',
    zIndex: 10,
  },
  chooseAttack: {
    color: 'white',
    fontFamily: 'ClashDisplayMedium',
    fontWeight: '500',
    fontSize: 24,
    position: 'absolute',
    top: '53%',
  },
  attacks: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    paddingHorizontal: '1%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  attack: {
    width: '47%',
    height: 144,
    borderRadius: 12,
    marginBottom: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  attackText: {
    fontFamily: 'ClashDisplaySemibold',
    fontWeight: '600',
    fontSize: 16,
    position: 'relative',
    bottom: '7%'
  }, 
  attackImage: {
    width: '90%',
    height: '110%',
    position: 'relative',
    top: '-20%',
    resizeMode: 'contain',
  }
});