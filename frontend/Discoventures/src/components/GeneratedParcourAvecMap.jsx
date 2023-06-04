import React, { Suspense } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Text,
  Switch
} from "react-native";
import { TextInput } from "@react-native-material/core";
import { useSelector } from "react-redux";

import CardRadioButtonText from "./CardRadioButtonText";
import Button from "./Button";
import ButtonCancel from "./ButtonCancel";
import colors from "../style/colors";
const BACKEND = "https://discoventures.osc-fr1.scalingo.io";

const Map =
  Platform.OS === "web"
    ? React.lazy(() => import("./MapWeb"))
    : React.lazy(() => import("./Map"));
//TODO add radio button with icon to chosse type activity
export default function GeneratedParcourAvecMap({ route, navigation }) {
  const userToken = useSelector((state) => state.user.token);
  const userID = useSelector((state) => state.user.id);
  const {
    name,
    icon,
    activity,
    distance,
    distance_km,
    parcours,
    lieux,
    temps,
    time_h_m_s,
    descrip,
  } = route.params;
  const [visiblePublic, setvisiblePublic] = React.useState(true);
  const toggleSwitch = () =>
    setvisiblePublic((previousState) => !previousState);
  const [errormsg, setErrormsg] = React.useState("");
  async function EnregistrerParcours() {
    //post les lieux
    let id_lieux = [];
    for (let indice = 0; indice < lieux.length; indice++) {
      let exited = false;
      await fetch(
        `${BACKEND}/places/${lieux[indice].coordinate[1]}/${lieux[indice].coordinate[0]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": userToken,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.status == 200) {
            exited = true;
            console.log("400: " + response.place["id"]);
            id_lieux.push(response.place["id"]);
            setErrormsg(null);
          }
        })
        .catch((error) => alert("Server error inscrire Get :" + error));
      if (!exited) {
        await fetch(`${BACKEND}/places`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": userToken,
          },
          body: JSON.stringify({
            data: JSON.stringify({
              title: lieux[indice].nom,
              description: descrip[indice],
              longitude: lieux[indice].coordinate[0],
              latitude: lieux[indice].coordinate[1],
            }),
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status != 201) {
              setErrormsg(response.message);
              return;
            } else {
              console.log("200: " + response.place["id"]);
              id_lieux.push(response.place["id"]);
              setErrormsg(null);
            }
          })
          .catch((error) => alert("Server error inscrire Post :" + error));
      }
    }
    let latitude_ = [];
    let longitude_ = [];
    for (let i = 0; i < parcours.length; i++) {
      latitude_.push(parcours[i][1]);
      longitude_.push(parcours[i][0]);
    }
    //post le parcour
    let id_route;
    await fetch(`${BACKEND}/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userToken,
      },
      body: JSON.stringify({
        data: JSON.stringify({
          title: name,
          coordinates: { data: { latitude: latitude_, longitude: longitude_ } },
          estimatedDistance: distance,
          estimatedTime: temps,
          activityType: activity,
          isPrivate: !visiblePublic,
          places: { ids: id_lieux },
        }),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status != 201) {
          setErrormsg(response.message);
        } else {
          setErrormsg(null);
          id_route = response.data["id"];
          console.log("creer route" + id_route);
          navigation.navigate("GenerateForm");
        }
      })
      .catch((error) => alert("Server error inscrire :" + error));
  }
  function RegenerParcours() {
    navigation.navigate("GenerateForm", {
      titreParcour: name,
      distance_km: distance_km,
    });
  }
  return (
    <View style={styles.container}>
      <ButtonCancel
        style={styles.btRegenerer}
        nativeID="btRegenerParcours"
        label="Regénérer un parcours"
        onPress={() => RegenerParcours()}
      />
      <Button
        nativeID="btEnregistrerParcours"
        label="Enregistrer le parcours"
        onPress={async () => EnregistrerParcours()}
      />
      <View
        style={{
          flexDirection: "row",
          height: 30,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.errorMsg} nativeID="errorMsgGenerationMap">
          {errormsg}
        </Text>
        <Text style={styles.textSwitch}>Visibilité publique</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.colorPrimary500.color }}
          thumbColor={"white"}
          onValueChange={toggleSwitch}
          value={visiblePublic}
        />
      </View>

      <TextInput
        nativeID="titleGenerationMap"
        label="Titre de Parcours"
        variant="outlined"
        style={[styles.input]}
        value={name}
        color="grey"
        enable={false}
        editable={false}
      />
      <View style={styles.cardcontainer}>
        <CardRadioButtonText
          titre="Type d'activité"
          icon={icon}
          text={activity}
        />
        <CardRadioButtonText
          titre="Distance estimé"
          icon="flag"
          text={distance_km + " km"}
        />
        <CardRadioButtonText
          titre="Temps estimé"
          icon="timer"
          text={time_h_m_s}
        />
      </View>
      <Suspense fallback={<ActivityIndicator />}>
        <Map parcours={parcours} nbLieux={lieux.length} lieux={lieux} />
      </Suspense>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  cardcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textSwitch: {
    marginRight: 10,
  },
});
