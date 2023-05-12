import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import fonts from '../style/fonts';
import { TextInput} from '@react-native-material/core';
import Button from './Button';
import colors from '../style/colors'
const BACKEND = "http://localhost:3000"

export default function SignUpForm(props) {
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errormsg, setErrormsg] = React.useState('')

  function signup(email, username, password){
    const body = new URLSearchParams();
    
    body.append("data",JSON.stringify({username:username, email:email,password:password}));
    fetch(`${BACKEND}/users`,{
        method:'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body
    })
    .then(response => response.json())
    .then(response =>{
      if(response.status!= 201){ 
        setErrormsg(response.message)
      }else{
        setErrormsg(null)
        props.navigation.navigate('Login');
      }
    })
    .catch(error => alert("Server error inscrire :" + error));
  }
  return (
    <View style={styles.container}>
        <Text style={fonts.text4xl}> Crée ton compte</Text>
        <TextInput
          nativeID='emailInputSignUp'
          label="E-mail"
          variant="outlined"
          style={styles.inputInscri} 
          onChangeText={setEmail} 
          value={email} 
          color="grey"/>
      <TextInput
          nativeID='userInputSignUp'
          label="Nom d'utilisateur"
          variant="outlined"
          style={styles.inputInscri} 
          onChangeText={setUsername} 
          value={username} 
          color="grey"/>
        <TextInput
          nativeID='passwordInputSignUp'
          label="Mot de passe"
          variant="outlined"
          style={styles.inputInscri} 
          secureTextEntry={true} 
          onChangeText={setPassword} 
          value={password} 
          color="grey"/>
        <Button 
          nativeID='btSignUp'
          label="S'inscrire" 
          onPress={()=>signup(email,username,password)}
        /> 
        <Text 
          style={styles.errorMsg}
          nativeID='errorMsgSignUp'
        >
        {errormsg}
      </Text>
        <Text>Déjà inscrit ?
            <Text style={styles.innerText} onPress={() => props.navigation.navigate('Login')}> Se Connecter</Text>
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    padding:20,
    justifyContent:'center'

  },
  inputInscri: {
    height:40,
    marginTop: 12,
    marginBottom: 12
  },
  innerText: {
    color: colors.colorPrimary500.color
  },
  errorMsg:{
    color: "red"
  }
});
