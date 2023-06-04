import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../views/user/profil/Profile.jsx";
import ParcoursVisual from "../../views/user/generation/ParcoursVisual";

// Navigation entre les différents fichiers pour la page Profile
export default function GenerateParcourStack() {
  const GenerateStack = createStackNavigator();
  return (
    <GenerateStack.Navigator>
      <GenerateStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <GenerateStack.Screen
        name="ParcoursVisual"
        component={ParcoursVisual}
        options={{ headerShown: false }}
      />
    </GenerateStack.Navigator>
  );
}
