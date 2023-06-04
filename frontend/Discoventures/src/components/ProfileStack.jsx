import { createStackNavigator } from "@react-navigation/stack";
import Profile from '../components/Profile';
import ParcoursVisual from '../components/ParcoursVisual';
export default function GenerateParcourStack() {
    const GenerateStack = createStackNavigator();
    return (
        <GenerateStack.Navigator>
            <GenerateStack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <GenerateStack.Screen name="ParcoursVisual" component={ParcoursVisual} options={{headerShown: false}}/>
        </GenerateStack.Navigator>
    )
}