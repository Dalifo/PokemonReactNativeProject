import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text 
      style={styles.title}>Select Your</Text>
      <Image
      style={styles.backgroundpoke}
      source={require('./assets/backpoke.png')}></Image>
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
    width: 478.21008,
    height: 478.21008,
  },
  title: {
    color: 'white',
  }
});
