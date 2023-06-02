import React from 'react'
import { View, StyleSheet } from "react-native";
import colors from '../style/colors';
import CardRadioButtonText from './CardRadioButtonText';
import Button from './Button';
import ButtonCancel from './ButtonCancel';

//TODO add radio button with icon to chosse type activity
export default function GeneratedParcourAvecMap({route,navigation}){

  const {name,icon,activity, distance,distance_km,parcours,lieux,temps,time_h_m_s,descrip } = route.params;
  // const lieux = ['aaa','bbb','ccc'];

  function EnregistrerParcours(){
    console.log("enregistrer le parcours");
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
      <View style={styles.cardcontainer}>
        <CardRadioButtonText titre="Type d'activité" icon={icon} text={activity}/>
        <CardRadioButtonText titre="Distance estimé" icon='flag' text={distance_km+' km'}/>
        <CardRadioButtonText titre="Temps estimé" icon='timer' text={time_h_m_s}/>
      </View>
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
  cardcontainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },

})