import * as React from 'react';
import { useFonts } from 'expo-font';
import {StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/components/SignInForm';
import Home from './src/components/home';
import colors from './src/style/colors';
import fonts from './src/style/fonts';
import { Provider } from 'react-redux';
import store from './src/app/store/store';
import { useSelector, useDispatch } from 'react-redux'
import { login } from './src/app/slices/userSlice';
import SignUpForm from './src/components/SignUpForm';
import { createStackNavigator } from '@react-navigation/stack';

const AuthContext = React.createContext();
const BACKEND = "http://localhost:3000"


const Stack = createStackNavigator();


const theme = {
  colors: {
    background: "white"
  }
};

export default function AppHome({ navigation }) {
  const token = useSelector((state) => state.user.token)

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
        <Stack.Screen name={'Login'} component={Signin} options={{headerShown: false}}/>
        <Stack.Screen name={'SignUp'} component={SignUpForm} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
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
