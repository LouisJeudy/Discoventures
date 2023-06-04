import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoutButton from './LogoutButton';
import ItemList from './ItemList';
import { useSelector, useDispatch } from 'react-redux';
import { setUserEmail, setUserId, setUserToken, setUsername } from '../app/slices/userSlice';
const BACKEND = "http://localhost:3000"

export default function DeleteRoutes(props) {
    const [routes, setRoutes] = React.useState([]);
    const [routeLoaded, setRouteLoaded] = useState(false);
    const token = useSelector((state) => state.user.token)

    const dispatch = useDispatch();

    function logout(){
      dispatch(setUserId(null))
      dispatch(setUsername(null))
      dispatch(setUserEmail(null))
      dispatch(setUserToken(null))

      props.navigation.navigate('Login')
    }

    const fetchRoutes = async () => {
    try {
      let response = await fetch(`${BACKEND}/routes/`,{
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            }
        })

      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  useEffect(() => {
    (async () => {
      setRouteLoaded(false);
      let res = await fetchRoutes();
      if (res.success) {
        setRoutes(res.data.data);
        console.log(res.data.data)
        setRouteLoaded(true);
      }
    })();
  }, []);

  const handleItemDelete = (routeID) => {
    // Supprimer la route avec l'ID correspondant de la liste
    const updatedRoutes = routes.filter(route => route.id !== routeID);
    setRoutes(updatedRoutes);
  };

    return (
      <View style={styles.container}>
          <View style={styles.userContainer}>
            <Icon name={'account'} size={70} color={'black'}/>
            <Text nativeID='profileUsernameAdmin'>{ useSelector((state) => state.user.username) }</Text>
            <LogoutButton nativeID='logoutAdmin' onPress={()=>logout()} />
          </View>
          <ScrollView nativeID='listRoutesAdmin'>
              { 
                routeLoaded ? (
                    routes.map((route) => {
                      return(<ItemList key={route.id} nativeID={"adminRoutes" + route.id} onDelete={handleItemDelete} key={route.id} idRoute={route.id} title={route.title} distance={route.estimatedDistance/1000} time={route.estimatedTime} activityType={route.activityType} gps={ route.coordinates.data }/>);
                  })):(<Text>No routes found !</Text>)
              }
          </ScrollView>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    userContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
});
