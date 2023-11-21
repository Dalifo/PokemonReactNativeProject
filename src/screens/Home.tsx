import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();

  const handleNavigateToPokemonList = () => {
    navigation.navigate('PokemonList' as never);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.title} source={require('../assets/title.png')} />
      <Image style={styles.backgroundpoke} source={require('../assets/background.png')} />
      <Pressable style={styles.button} onPress={handleNavigateToPokemonList}>
        <Text style={styles.buttonText}>Jump into Battlefield</Text>
      </Pressable>
      <StatusBar style="auto" />
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
    top: 253,
    zIndex: 1,
    width: 431,
    height: 422,
  },
  title: {
    position: 'absolute',
    top: 70,
    zIndex: 2,
    width: 264,
    height: 157,
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
});
