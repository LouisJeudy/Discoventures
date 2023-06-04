import { createStackNavigator } from "@react-navigation/stack";
import Decouvertes from '../components/Decouvertes';
import ParcoursVisual from '../components/ParcoursVisual';
export default function DecouvertesStack() {
    const GenerateStack = createStackNavigator();
    return (
        <GenerateStack.Navigator>
            <GenerateStack.Screen name="Decouvertes" component={Decouvertes} options={{headerShown: false}}/>
            <GenerateStack.Screen name="ParcoursVisual" component={ParcoursVisual} options={{headerShown: false}}/>
        </GenerateStack.Navigator>
    )
}