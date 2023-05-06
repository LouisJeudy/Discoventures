import { StyleSheet, View, Pressable, Text } from 'react-native';
import colors from '../style/colors'
import fonts from '../style/fonts'
export default function Button({ label, onPress, nativeID }) {
  return (
    <View >
      <Pressable style={styles.container} onPress={onPress} nativeID={nativeID}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.colorPrimary500.color,
    borderRadius:10,
    marginTop: 10,
    marginBottom: 10,
  },  
  buttonLabel: {
    flexDirection: "row",
    color: "white",
    padding: 10,
  }
});
