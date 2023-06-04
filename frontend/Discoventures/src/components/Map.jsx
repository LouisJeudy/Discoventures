import React from "react";
import * as Location from "expo-location";
// Import required components
import { SafeAreaView, StyleSheet, View} from "react-native";
// Import Map and Marker
import MapView, { Polyline, Marker } from "react-native-maps";
import  { getDistance } from 'geolib';
import colors from "../style/colors";
import * as Speech from 'expo-speech';

export default function Map({ parcours, nbLieux, lieux, description}) {
  const origin = { latitude: parcours[0][1], longitude: parcours[0][0] };
  let parle;
  if(description.length > 0){
    parle = Array(description.length).fill(0)
  } 
  React.useEffect(() => {
    const positionGPS = getLocationPermission();
    if(description.length > 0){
      const interval = setInterval(() => {
        //calcul la distance entre les lieux
        for(let i = 0; i<lieux.length ;i++){
          if(parle[i] == 1){
            continue;
          }
          let p2 = {latitude: lieux[i].coordinate[1], longitude: lieux[i].coordinate[0]};
          let distance = getDistance(positionGPS['_j'],p2,1);
          if(distance < 300){
            //lancer audio
            console.log(description[i]);
           
              const thingToSay = description[i]; 
              Speech.speak(thingToSay);
                 
            parle[i]=1;
          }
        }

      }, 10000);
      return () => clearInterval(interval);
   }
  }, []);

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    return current;
  }
  const markers = [];
  for (let index = 0; index < nbLieux; index++) {
    let location_lieu = {
      latitude: lieux[index].coordinate[1],
      longitude: lieux[index].coordinate[0],
    };
    markers.push(
      <Marker
        coordinate={location_lieu}
        onDrag={true}
        title={"Lieu " + (index + 1)}
        description={lieux[index].nom}
      >
        <View style={styles.circle}>
          <View style={styles.core} />
          <View style={styles.stroke} />
        </View>
      </Marker>
    );
  }
  const coordinates = [];
  for (let i = 0; i < parcours.length; i++) {
    coordinates.push({
      latitude: parcours[i][1],
      longitude: parcours[i][0],
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          showsUserLocation={true}
          userLocationUpdateInterval={5000}
          userLocationFastestInterval={5000}
        >
          <Polyline
            coordinates={coordinates}
            strokeColor={colors.colorSuccess500.color} // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={4}
            lineJoin={"round"}
          />
          {markers}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50,
  },
  stroke: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  core: {
    backgroundColor: colors.colorError400.color,
    width: 24,
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    height: 24,
    borderRadius: 50,
    zIndex: 2,
  },
});
