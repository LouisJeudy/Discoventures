import React, { Suspense } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import colors from "../../../style/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// La map mobile n'est pas supporté en version desktop
// Il faut donc deux versions différentes
const Map =
  Platform.OS === "web"
    ? React.lazy(() => import("./Map/MapWeb"))
    : React.lazy(() => import("./Map/Map"));

// Page pour démarrer ou stopper le parcours
export default function ParcoursVisual({ route, navigation }) {
  const [isStart, setIsStart] = React.useState(false);
  const { latitude, longitude, lieux, description } = route.params;
  let parcours = [];
  for (let i = 0; i < latitude.length; i++) {
    parcours.push([longitude[i], latitude[i]]);
  }

  function gotoBackPage() {
    setIsStart(false);
    navigation.goBack();
  }
  function commencerParcours() {
    setIsStart(true);
  }
  function finirParcours() {
    setIsStart(false);
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Icon
          name={"arrow-left-circle"}
          size={40}
          color={colors.colorPrimary500.color}
          onPress={() => gotoBackPage()}
        />
        {isStart ? null : (
          <Icon
            marginHorizontal={130}
            nativeID="visualIconPlay"
            name={"play"}
            size={40}
            color={colors.colorPrimary500.color}
            onPress={() => commencerParcours()}
          />
        )}
        {isStart ? (
          <Icon
            marginHorizontal={130}
            name={"stop-circle"}
            size={40}
            color={colors.colorPrimary500.color}
            onPress={() => finirParcours()}
          />
        ) : null}
      </View>
      <Suspense fallback={<ActivityIndicator />}>
        <Map
          parcours={parcours}
          nbLieux={lieux.length}
          lieux={lieux}
          description={description}
          isStart={isStart}
        />
      </Suspense>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
  },
  box: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
