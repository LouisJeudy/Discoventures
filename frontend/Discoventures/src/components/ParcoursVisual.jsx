import React, { Suspense } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform
} from "react-native";
import colors from '../style/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const BACKEND = "https://discoventures.osc-fr1.scalingo.io";

const Map =
  Platform.OS === "web"
    ? React.lazy(() => import("./MapWeb"))
    : React.lazy(() => import("./Map"));
//TODO add radio button with icon to chosse type activity
export default function ParcoursVisual({ route, navigation }) {
  const [start, setStart]= React.useState(false);
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
    navigation.goBack();
  }
 function commencerParcours(){
    setStart(true) 
 }
  function finirParcours(){
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
        <View style={styles.box}>
        <Icon name={'arrow-left-circle'} size={40} color={colors.colorPrimary500.color} onPress={()=>gotoBackPage()}/>
        {start?null:<Icon marginHorizontal={130} nativeID='visualIconPlay' name={'play'} size={40} color={colors.colorPrimary500.color} onPress={()=>commencerParcours()}/>}
        {start?<Icon marginHorizontal={130} name={'stop-circle'} size={40} color={colors.colorPrimary500.color} onPress={()=>finirParcours()}/>:null}
        </View>
      <Suspense fallback={<ActivityIndicator />}>
        <Map parcours={parcours} nbLieux={lieux.length} lieux={lieux} description={description} />
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
