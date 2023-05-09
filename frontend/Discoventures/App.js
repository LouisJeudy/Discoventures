import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/components/signin';
import Home from './src/components/home';
import Button from './src/components/Button';
import {TextInput} from "@react-native-material/core";
import { reducer } from './src/reducers/reducer.js';
import { initialState } from './src/reducers/reducer.js';
import colors from './src/style/colors';
import fonts from './src/style/fonts';

const AuthContext = React.createContext();
const BACKEND = "http://localhost:3000"


const Stack = createNativeStackNavigator();


const theme = {
  colors: {
    background: "white"
  }
};

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  function SignInScreen(message) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
    return (
    <View style={styles.container}>
        <Text style={[styles.baseText, fonts.text4xl]}>
        Connexion à mon compte
        </Text>
        <TextInput
          nativeID='emailInput'
          label="E-mail"
          variant="outlined"
          style={[styles.input]} 
          onChangeText={setEmail} 
          value={email} 
          color="grey"
        />
         <TextInput
          nativeID='passwordInput'
          label="Mot de passe"
          variant="outlined"
          style={styles.input} 
          secureTextEntry={true} 
          onChangeText={setPassword} 
          value={password}
          color="grey"
        />
          <Button
            nativeID='btnConnect'
            label='Se connecter'
            style={styles.button}
            onPress={() => signIn({email, password})}
          />
        <Text 
          style={styles.errorMsg}
          nativeID='errorMsg'
        >
          {state.errorMsg}
        </Text>
        <Text>
        Pas encore de compte ? 
          <Text style={styles.innerText}> S'inscrire</Text>
        </Text>
      </View>
      );
  }

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        // console.log(data)
        const email = data.email
        const password = data.password
        fetch("https://discoventures.osc-fr1.scalingo.io/login",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
              // setToken(data.token)
                console.log(data.token)
                dispatch({ type: 'SIGN_IN', token: data.token });
            } else {
               console.log(data.message)
                dispatch({ type: 'ERROR', errorMsg: data.message });
            }})
        .catch(error => alert("Server error " + error))
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: fonts.font2text2xl.fontFamily,
              color: colors.colorPrimary900.color,
              fontWeight:  fonts.font2text2xl.fontWeight
            }
          }}>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Discoventures"
              component={SignInScreen}
              options={{
                title: 'Discoventures'
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Discoventure" component={Home}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    padding:20,
    justifyContent:'center'
  },
  innerText: {
    color: colors.colorPrimary500.color
  },
  input : {
    height:40,
    marginTop: 12,
    marginBottom: 12
  },
  errorMsg:{
    color: "red"
  }
})