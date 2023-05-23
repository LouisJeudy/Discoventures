import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { TextInput } from "@react-native-material/core"
import Button from './Button'
import colors from '../style/colors'
import RadioButton from './radioButton'
import { useSelector } from 'react-redux'
import {getRoute} from '../components/GenerateParcours'
import * as Location from 'expo-location'
import { Description } from '@mui/icons-material'

//TODO add radio button with icon to chosse type activity
export default function GenerateParcoursForm() {
  const [titre, setTitre] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [distance, setDistance] = React.useState('');
  const [visibility, setVisibility] = React.useState('true');
  const [errormsg, setErrormsg] = React.useState('')
  const type = useSelector((state) => state.activity.type);
 
  async function onGenerateParcours(titre, distance, visibility){
    if(titre===''){
      setErrormsg('Veuillez remplir le titre de parcours')
      return;
    }else if( type === null){
      setErrormsg("Veuillez choisir un type d'activite")
      return;
    }else if( distance === ''){
      setErrormsg("Veuillez inserer une distance")
      return;
    }else{
          setErrormsg(null)
      }
  const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === "granted"){
      let coord = await Location.getCurrentPositionAsync({})
      const position = [coord.coords.longitude,coord.coords.latitude]
      setLocation(position);
      distance = distance * 1000;
      const res = await getRoute(position, distance, type);
      let description = []
      for(let i = 0; i < res.lieux_tour.length; i++){
        description.push(await get_description_lieux_touristiques(res.lieux_tour[i].nom));
        console.log(description[i]);
      }
    
  }
  }

  async function get_description_lieux_touristiques(title){
    let description;
    let length;
    await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=search&formatversion=2&exintro=1&srsearch=${title}&srlimit=1&origin=*`,{ method: 'GET'})
    .then(response => response.json())
    .then(response =>{
      length = response.query.search.length 
      if(length > 0){
       title = response.query.search[0].title;
      }
    });
    if(length == 0){
     return "Ici est " + title;
    }
    const extract = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&formatversion=2&exintro=1&origin=*`,{ method: 'GET'})
    .then(response => response.json())
    .then(response =>{
      description = response.query.pages[0].extract.replace(/<!--(?!>)[\S\s]*?-->/g, '');
    }); 
    return description
  }
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
        value={'Ma position'} 
        color="grey"
        enable={false}
        editable = {false}
      />
      <Text style={styles.textStyle} >Type d’activité</Text>
      <RadioButton ></RadioButton>
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
          onPress={async ()=>onGenerateParcours(titre, distance, visibility)}
        />
      <Text 
        style={styles.errorMsg}
        nativeID='errorMsg'
      >
        {errormsg}
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