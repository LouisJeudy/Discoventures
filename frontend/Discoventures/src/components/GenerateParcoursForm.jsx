import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { TextInput } from "@react-native-material/core";
import Button from './Button';
import colors from '../style/colors'
import RadioButton from './radioButton';
import { useSelector } from 'react-redux'

const BACKEND = "http://localhost:3000"
//TODO add radio button with icon to chosse type activity
export default function GenerateParcoursForm() {
  const [titre, setTitre] = React.useState('');
  const [lieuDepart, setLieuDepart] = React.useState('');
  const [distance, setDistance] = React.useState('');
  const [visibility, setVisibility] = React.useState('true');
  const [errormsg, setErrormsg] = React.useState('')
  return (
    <View style={styles.container}>
      <TextInput
        nativeID='titreParcoursInput'
        label="Titre de Parcours"
        variant="outlined"
        style={styles.input} 
        onChangeText={setTitre} 
        value={titre}
        color="grey"
      />
      <TextInput
        nativeID='departInput'
        label="Lieu de Depart"
        variant="outlined"
        style={[styles.input]} 
        onChangeText={setLieuDepart} 
        value={lieuDepart} 
        color="grey"
      />
      <Text style={styles.textStyle} >Type d’activité</Text>
      <RadioButton></RadioButton>
      <TextInput
        nativeID='distanceInput'
        label="Distance (km)"
        variant="outlined"
        keyboardType = 'numeric' 
        style={[styles.input]} 
        onChangeText={setDistance} 
        value={distance} 
        color="grey"
      />
      <Button
          nativeID='btnGenerateParcours'
          label='Générer un parcours'
          style={styles.button}
          onPress={()=>onGenerateParcours(titre, lieuDepart, distance, typeActivity, visibility)}
        />
      <Text 
        style={styles.errorMsg}
        nativeID='errorMsg'
      >
        {useSelector((state) => state.activity.type)}
      </Text>
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
  innerText: {
    color: colors.colorPrimary500.color
  },
  input : {
    height:40,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  textStyle:{
    marginTop:12,
    marginBottom: 12,
    fontFamily: 'Raleway-Regular',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20
  }
  ,
  errorMsg:{
    color: "red"
  }
})