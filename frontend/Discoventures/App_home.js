import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Signin from './src/components/SignInForm';
import Home from './src/components/home';
import SignUpForm from './src/components/SignUpForm';
import GeneratedParcourAvecMap from './src/components/GeneratedParcourAvecMap';
import GenerateParcoursForm from './src/components/GenerateParcoursForm';
import { createStackNavigator } from '@react-navigation/stack';
import DeleteRoutes from './src/components/DeleteRoutes';

const Stack = createStackNavigator();

const theme = {
  colors:{
    background: "white"
  }
};

export default function AppHome() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
        <Stack.Screen name={'Login'} component={Signin} options={{headerShown: false}}/>
        <Stack.Screen name={'SignUp'} component={SignUpForm} options={{headerShown: false}}/>
        <Stack.Screen name={'GenerateMap'} component={GeneratedParcourAvecMap} options={{headerShown: false}}/>
        <Stack.Screen name={'GenerateForm'} component={GenerateParcoursForm} options={{headerShown: false}}/>
        <Stack.Screen name={'DeleteRoutes'} component={DeleteRoutes} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
