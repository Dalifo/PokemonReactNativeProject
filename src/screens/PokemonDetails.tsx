import React from "react";
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetCardById } from "../hooks/useGetCardById";

export default function App() {
    const navigation = useNavigation();
    const route = useRoute();
    const { pokedexId } = route.params as { pokedexId: number };
    const { data, isFetching } = useGetCardById(pokedexId);
  
    const handleNavigateToHome = () => {
      navigation.navigate("Home" as never);
    };
  
    return (
      <View style={styles.container}>
        <Pressable onPress={handleNavigateToHome}>
          <Image source={require("../assets/arrow_back.png")} />
        </Pressable>
        {isFetching ? (
          <ActivityIndicator />
        ) : data ? (
          <>
            <Image
              style={styles.backgroundpoke}
              source={{ uri: data.sprites.regular }}
            />
            <Text style={styles.title}>{data.name.en}</Text>
          </>
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    );
  }
  


const styles = StyleSheet.create({
  backgroundpoke: {
    position: "absolute",
    top: 253,
    zIndex: 1,
    width: 431,
    height: 422,
  },
  title: {
    position: "absolute",
    top: 70,
    zIndex: 2,
    width: 264,
    height: 157,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
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
  }
  // ... existing styles ...
});
