import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../style/colors";

// Bouton croix rouge
export default function DeleteButton({ onPress, nativeID }) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress} nativeID={nativeID}>
        <Icon
          name={"close-circle"}
          size={18}
          color={colors.colorError500.color}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
