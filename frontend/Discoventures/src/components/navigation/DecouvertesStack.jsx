import { createStackNavigator } from "@react-navigation/stack";
import Decouvertes from "../../views/user/decouvertes/Decouvertes";
import ParcoursVisual from "../../views/user/generation/ParcoursVisual";

// Navigation entre les différents fichiers pour la page Découvertes
export default function DecouvertesStack() {
  const GenerateStack = createStackNavigator();
  return (
    <GenerateStack.Navigator>
      <GenerateStack.Screen
        name="Decouvertes"
        component={Decouvertes}
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
