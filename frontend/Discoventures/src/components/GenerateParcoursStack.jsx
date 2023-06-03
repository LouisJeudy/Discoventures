import { createStackNavigator } from "@react-navigation/stack";
import GeneratedParcourAvecMap from '../components/GeneratedParcourAvecMap';
import GenerateParcoursForm from '../components/GenerateParcoursForm';
export default function GenerateParcourStack() {
    const GenerateStack = createStackNavigator();
    return (
        <GenerateStack.Navigator>
            <GenerateStack.Screen name="GenerateForm" component={GenerateParcoursForm} options={{headerShown: false}}/>
            <GenerateStack.Screen name="GenerateMap" component={GeneratedParcourAvecMap} options={{headerShown: false}}/>
        </GenerateStack.Navigator>
    )
}