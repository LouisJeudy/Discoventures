import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Signin from "./src/views/common/signIn/SignInForm";
import SignUpForm from "./src/views/common/signUp/SignUpForm";
import Home from "./src/components/navigation/home";
import GeneratedParcourAvecMap from "./src/views/user/generation/GeneratedParcourAvecMap";
import GenerateParcoursForm from "./src/views/user/generation/GenerateParcoursForm";
import ParcoursVisual from "./src/views/user/generation/ParcoursVisual";
import Profile from "./src/views/user/profil/Profile";
import Decouvertes from "./src/views/user/decouvertes/Decouvertes";
import DeleteRoutes from "./src/views/admin/routes/DeleteRoutes";

const Stack = createStackNavigator();

const theme = {
  colors: {
    background: "white",
  },
};

export default function AppHome() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen
          name={"Home"}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Login"}
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"SignUp"}
          component={SignUpForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"GenerateMap"}
          component={GeneratedParcourAvecMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"GenerateForm"}
          component={GenerateParcoursForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"DeleteRoutes"}
          component={DeleteRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Profile"}
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Decouvertes"}
          component={Decouvertes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ParcoursVisual"}
          component={ParcoursVisual}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
