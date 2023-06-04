import { createStackNavigator } from "@react-navigation/stack";
import GeneratedParcourAvecMap from "../../views/user/generation/GeneratedParcourAvecMap";
import GenerateParcoursForm from "../../views/user/generation/GenerateParcoursForm";

// Navigation entre les différents fichiers pour la page Génération de parcours
export default function GenerateParcourStack() {
  const GenerateStack = createStackNavigator();
  return (
    <GenerateStack.Navigator>
      <GenerateStack.Screen
        name="GenerateForm"
        component={GenerateParcoursForm}
        options={{ headerShown: false }}
      />
      <GenerateStack.Screen
        name="GenerateMap"
        component={GeneratedParcourAvecMap}
        options={{ headerShown: false }}
      />
    </GenerateStack.Navigator>
  );
}
