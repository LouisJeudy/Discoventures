/* eslint-disable no-undef */
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store/store';
import AppHome from './App_home';
<<<<<<< HEAD
import { useFonts } from 'expo-font';

export default function App() {

=======
import Profile from './src/components/Profile';
import { useFonts } from 'expo-font';
import MapCard from './src/components/MapCard';

export default function App() {
>>>>>>> be9ea4d (logout & begin of cardmap)
  const [fontsLoaded] = useFonts({
    'Raleway-Bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway/Raleway-SemiBold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
    'CantoraOne-Regular': require('./assets/fonts/Cantora/CantoraOne-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
<<<<<<< HEAD
    return (
      <Provider store={store}>
        <AppHome/>
      </Provider>
    );
=======

    //const { signIn } = React.useContext(AuthContext);
    return (
    <Provider store={store}>
      <MapCard/>
    </Provider>
      );
>>>>>>> be9ea4d (logout & begin of cardmap)
  }
 