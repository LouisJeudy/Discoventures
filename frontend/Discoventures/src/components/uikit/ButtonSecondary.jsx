import { StyleSheet, View, Pressable, Text } from "react-native";
import colors from "../../style/colors";

// Element UIKit représentant le style de bouton secondaire
export default function ButtonSecondary({ label, onPress, nativeID }) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress} nativeID={nativeID}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: colors.colorPrimary500.color,
    borderWidth: 2,
  },
  buttonLabel: {
    flexDirection: "row",
    color: colors.colorPrimary500.color,
    padding: 10,
  },
});
