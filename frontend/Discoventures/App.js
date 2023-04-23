import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import colors from "./src/style/colors.js"
import fonts from "./src/style/fonts.js"

export default function App() {
  const [fontsLoaded] = useFonts({
    'Raleway-Bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway/Raleway-SemiBold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
