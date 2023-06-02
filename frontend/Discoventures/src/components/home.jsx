import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GenerateParcoursStack from '../components/GenerateParcoursStack'
import colors from '../style/colors';
import { useSelector } from 'react-redux'

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    );
  }
  
  function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Generation')} />
      </View>
    );
  }

const Tab = createBottomTabNavigator();

export default function Home() {

  const token = useSelector((state) => state.user.token)
  console.log(token)

    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Génération') {
                iconName = focused
                  ? 'refresh'
                  : 'refresh';
              } else if (route.name === 'Découvertes') {
                iconName = focused ? 'apple-safari' : 'apple-safari';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'account-circle' : 'account-circle';
              }
  
              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.colorPrimary500.color,
            tabBarInactiveTintColor: colors.colorNeutral400.color,
          })}
        >
          <Tab.Screen name="Génération" component={GenerateParcoursStack} />
          <Tab.Screen name="Découvertes" component={SettingsScreen} />
          <Tab.Screen name="Profile" component={SettingsScreen} />
        </Tab.Navigator>
    );
  }