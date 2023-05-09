import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/components/signin';
import Home from './src/components/home';
import Button from './src/components/Button';
import {TextInput} from "@react-native-material/core";
import colors from './src/style/colors';
import fonts from './src/style/fonts';

const AuthContext = React.createContext();
const BACKEND = "http://localhost:3000"

// function SplashScreen() {
//   return (
//     <View>
//       <Text>Loading...</Text>
//     </View>
//   );
// }

// function HomeScreen() {
//   const { signOut } = React.useContext(AuthContext);

//   return (
//     <View>
//       <Text>Signed in!</Text>
//       <Button title="Sign out" onPress={signOut} />
//     </View>
//   );
// }

// function SignInScreen() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const { signIn } = React.useContext(AuthContext);

//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Sign in" onPress={() => signIn({ username, password })} />
//     </View>
//   );
// }

function onConnect(email, password){
  // fetch("http://localhost:3000/users",{
  //   method:'GET',
  //   headers: {'Content-Type': 'application/json'}
  // }).then(response => response.json())
  // .then(data => {
  //   console.log(data);
  // }).catch(error => alert("Server error"))
  fetch("http://localhost:3000/login",{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
  })
  .then(response => response.json())
  .then(data => {
      if (data.token) {
          setToken(data.token)
          console.log(data.token)
      } else {
          setErrormsg(data.message)
          console.log(data.message)
      }})
  .catch(error => alert("Server error"))
}

function SignInScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [errormsg, setErrormsg] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
  return (
  <View style={styles.container}>
      {/* <MyHeader label1={"Discoventures"} label2={"Connexion"} style={styles.header}></MyHeader> */}
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
        {errormsg}
      </Text>
      <Text>
      Pas encore de compte ? 
        <Text style={styles.innerText}> S'inscrire</Text>
      </Text>
    </View>
    );
}

const Stack = createNativeStackNavigator();


const theme = {
  colors: {
    background: "white"
  }
};

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       // Restore token stored in `SecureStore` or any other encrypted storage
  //       // userToken = await SecureStore.getItemAsync('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log(data)
        const email = data.email
        const password = data.password
        fetch("http://localhost:3000/login",{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
      })
      .then(response => response.json())
      .then(data => {
          if (data.token) {
             // setToken(data.token)
              console.log(data.token)
          } else {
              setErrormsg(data.message)
              console.log(data.message)
          }})
      .catch(error => alert("Server error " + error))
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
        <Stack.Navigator>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in'
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