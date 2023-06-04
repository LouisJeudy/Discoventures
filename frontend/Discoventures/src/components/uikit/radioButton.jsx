import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from "react-redux";
import { setType } from "../../app/slices/activitySlice";

import fonts from "../../style/fonts";
import colors from "../../style/colors";

// Groupe de boutons stylisé avec icône et texte représentant un bouton radio
export default function RadioButton() {
  const selectedStyleData = [
    { value: "walk", iconName: "walk" },
    { value: "run", iconName: "run-fast" },
    { value: "bike", iconName: "bike-fast" },
  ];
  const dispatch = useDispatch();
  return (
    <View>
      <View style={styles.radioIconRow}>
        {selectedStyleData.map((item) => {
          return (
            <Pressable
              nativeID={item.value}
              key={item.value}
              onPress={() => dispatch(setType(item.value))}
              style={
                useSelector((state) => state.activity.type) === item.value
                  ? styles.RButtonPressedStyle
                  : styles.RButtonStyle
              }
            >
              <Icon name={item.iconName} size={27} />
              <Text style={fonts.textMRegular}>{item.value}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  radioIconRow: {
    flexDirection: "row",
  },
  RButtonStyle: {
    height: 80,
    width: 80,
    marginHorizontal: 23,
    backgroundColor: colors.colorNeutral50.color,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  RButtonPressedStyle: {
    height: 80,
    width: 80,
    marginHorizontal: 23,
    borderRadius: 16,
    backgroundColor: colors.colorPrimary50.color,
    alignItems: "center",
    justifyContent: "center",
  },
});
