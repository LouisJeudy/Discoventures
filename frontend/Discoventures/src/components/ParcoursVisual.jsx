import React, { Suspense } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform
} from "react-native";
import Button from "./Button";
import colors from '../style/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const BACKEND = "https://discoventures.osc-fr1.scalingo.io";

const Map =
  Platform.OS === "web"
    ? React.lazy(() => import("./MapWeb"))
    : React.lazy(() => import("./Map"));
//TODO add radio button with icon to chosse type activity
export default function ParcoursVisual({ route, navigation }) {
// export default function ParcoursVisual() {

     // const name = "test";
  // const icon = "walk";
  // const activity ="walk";
  // const distance = 1800;
  // const distance_km = 1.8;
//    const parcours = [[5.754958, 45.186589], [5.754892, 45.186627], [5.754727, 45.18672], [5.754566, 45.186812], [5.754276, 45.186587], [5.754236, 45.186556], [5.754211, 45.186537], [5.754102, 45.186568], [5.754649, 45.187009], [5.754734, 45.187078], [5.754772, 45.187069], [5.755493, 45.18689], [5.755523, 45.18695], [5.755554, 45.187014], [5.755568, 45.187041], [5.755576, 45.187057], [5.755612, 45.18713], [5.755648, 45.187203], [5.755231, 45.187288], [5.755223, 45.187331], [5.755187, 45.187376], [5.755304, 45.187541], [5.754765, 45.187739], [5.754705, 45.187761], [5.754556, 45.187758], [5.754527, 45.18777], [5.754353, 45.187847], [5.75424, 45.187916], [5.7541, 45.188016], [5.754065, 45.188042], [5.754146, 45.18809], [5.75426, 45.188186], [5.754489, 45.188482], [5.75466, 45.188702], [5.754759, 45.188834], [5.754837, 45.188937], [5.754759, 45.188834], [5.75466, 45.188702], [5.754489, 45.188482], [5.754536, 45.188464], [5.75464, 45.188424], [5.754929, 45.188319], [5.755319, 45.188179], [5.756227, 45.187833], [5.756294, 45.187766], [5.756241, 45.187714], [5.756064, 45.187538], [5.755912, 45.187358], [5.755733, 45.187243], [5.755648, 45.187203], [5.755612, 45.18713], [5.755576, 45.187057], [5.755568, 45.187041], 
//   [5.755554, 45.187014], [5.755523, 45.18695], [5.755493, 45.18689], [5.755191, 45.186283], [5.755067, 45.186051], [5.754984, 45.185898], [5.754496, 45.185006], [5.754549, 45.184997], [5.754593, 45.184983], [5.754685, 45.184957], [5.754784, 45.18493], [5.754741, 45.18485], [5.754677, 45.184733], [5.754337, 45.184128], [5.754323, 45.184098], [5.754271, 45.183967], [5.754311, 45.18389], [5.754909, 45.183725], [5.755639, 45.183527], [5.755793, 45.183484], [5.755639, 45.183527], [5.754909, 45.183725], [5.754311, 45.18389], [5.754271, 45.183967], [5.754323, 45.184098], [5.754337, 45.184128], [5.754677, 45.184733], [5.754741, 45.18485], [5.754784, 45.18493], [5.754685, 45.184957], [5.754593, 45.184983], [5.754549, 45.184997], [5.754496, 45.185006], [5.753903, 45.185154], [5.75405, 45.185442], [5.754044, 45.185606], [5.75404, 45.185689], [5.754037, 45.185746], [5.754021, 45.185946], [5.753994, 45.186285], [5.754088, 45.186405], [5.75417, 45.186487], [5.754193, 45.186515], [5.754211, 45.186537], [5.754236, 45.186556], [5.754276, 45.186587], [5.754566, 45.186812], [5.754727, 45.18672], [5.754892, 45.186627], [5.754958, 45.186589]];
//   const lieux = [{"coordinate": [2.353225, 48.856586], "nom": "Bibliothèque de l'Hôtel de Ville"}, {"coordinate": [2.35108, 48.856811], "nom": "Hôtel de Ville"}, {"coordinate": [2.353971, 48.855738], "nom": "Eglise Saint-Gervais-Saint-Protais"}, {"coordinate": [2.352538, 48.858082], "nom": "Immeuble"}, {"coordinate": [2.351603, 48.858113], "nom": "Immeuble"}];
  // const temps = 1173.714;
  // const time_h_m_s = '0h20';
  // const descrip = ["<p>Le <b>Théâtre de l'Aquarium</b> est installé sur le site de La Cartoucherie dans le bois de Vincennes dans le <abbr class=\"abbr\" title=\"Douzième\">12<sup>e</sup></abbr> arrondissement de Paris. Il jouxte les autres théâtres de La Cartoucherie : le Théâtre du Soleil, le Théâtre de la Tempête, le Théâtre de l'Épée de Bois et l'Atelier de Paris / CDCN.</p>",
  //  "<p class=\"mw-empty-elt\"></p> <p>Le <b>parc de Bagatelle</b> est un parc situé dans le <abbr class=\"abbr\" title=\"Seizième\">16<sup>e</sup></abbr> arrondissement de Paris (France), en bordure de la pelouse (dite aussi « plaine de jeux ») de Bagatelle, dans le bois de Boulogne. Proche de la limite sud de la commune de Neuilly-sur-Seine, il est l'un des quatre pôles du Jardin botanique de la ville de Paris avec le jardin des serres d'Auteuil situé au sud-est du bois, ainsi que le parc floral de Paris et l'arboretum de l'école du Breuil, eux dans le bois de Vincennes.</p>"];  
  const [start, setStart] = React.useState(false);
  const iconName = ['play','pause-circle']
  const [iconPlay, setIconPlay] = React.useState(iconName[0]);
  const {
    latitude,
    longitude,
    lieux,
    description
  } = route.params;
  let parcours = [];
  for(let i = 0; i<latitude.length;i++){
    parcours.push([longitude[i],latitude[i]]);
  }

  function gotoBackPage(){
    console.log("goback");
    navigation.goBack();
  }
  function commencerParcours(){
    setStart(!start);
    console.log("start parcours");
    if(start){
        setIconPlay(iconName[0]);
    }else{
        setIconPlay(iconName[1]);
    }
  }
  function finirParcours(){
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
        <View style={styles.box}>
        <Icon name={'arrow-left-circle'} size={40} color={colors.colorPrimary500.color} onPress={()=>gotoBackPage()}/>
        <Icon marginHorizontal={130} nativeID='visualIconPlay' name={iconPlay} size={40} color={colors.colorPrimary500.color} onPress={()=>commencerParcours()}/>
        {iconPlay=='pause-circle'?<Icon name={'stop-circle'} size={40} color={colors.colorPrimary500.color} onPress={()=>finirParcours()}/>:null}
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
    padding: 10,
    justifyContent: "center",
  },
  box:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
  }
});
