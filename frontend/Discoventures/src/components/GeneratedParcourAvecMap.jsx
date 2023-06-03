import React,{Suspense} from 'react'
import { View, StyleSheet, ActivityIndicator, Platform} from "react-native";
import { TextInput } from "@react-native-material/core"
import CardRadioButtonText from './CardRadioButtonText';
import Button from './Button';
import ButtonCancel from './ButtonCancel';
const Map = Platform.OS ==="web"? 
  React.lazy(()=>import('./MapWeb')):
  React.lazy(()=>import('./Map'));
//TODO add radio button with icon to chosse type activity
export default function GeneratedParcourAvecMap({route,navigation}){
  const [visibility, setVisibility] = React.useState('true');
  const {name,icon,activity, distance,distance_km,parcours,lieux,temps,time_h_m_s,descrip } = route.params;
  function EnregistrerParcours(){
    console.log("enregistrer le parcours");
    console.log(distance);
    console.log(temps);
    console.log(descrip);
    console.log(visibility);
    setVisibility('false');
  }
  function RegenerParcours(){
    navigation.navigate('GenerateForm',{
      titreParcour:name,
      distance_km:distance_km 
    });
  }
  return (
    <View style={styles.container}>
      <ButtonCancel style={styles.btRegenerer}nativeID='btRegenerParcours'
          label="Regénérer un parcours" 
          onPress={()=>RegenerParcours()}
      />
      <Button  nativeID='btEnregistrerParcours'
          label="Enregistrer le parcours" 
          onPress={()=>EnregistrerParcours()}
      />
      <TextInput
        nativeID='titleGenerationMap'
        label="Titre de Parcours"
        variant="outlined"
        style={[styles.input]} 
        value={name} 
        color="grey"
        enable={false}
        editable = {false}
      />
      <View style={styles.cardcontainer}>
        <CardRadioButtonText titre="Type d'activité" icon={icon} text={activity}/>
        <CardRadioButtonText titre="Distance estimé" icon='flag' text={distance_km+' km'}/>
        <CardRadioButtonText titre="Temps estimé" icon='timer' text={time_h_m_s}/>
      </View>
      <Suspense fallback={<ActivityIndicator/>}>
        <Map parcours={parcours} nbLieux={lieux.length} lieux={lieux}/>
      </Suspense>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    padding:20,
    justifyContent:'center',
  },
  input : {
    height:40,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  cardcontainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },

})