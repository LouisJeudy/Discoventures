import React from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import colors from '../style/colors'
import { Divider } from "@react-native-material/core";
import LogoutButton from './LogoutButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch} from 'react-redux'
import { setUserToken } from '../app/slices/userSlice';
import MapCard from './MapCard';
const BACKEND = "http://localhost:3000"

export default function Profile(props) {
  const username = "louis";

  // TODO: Appel GET de la route /routes/users/:id

  const [routes, setRoutes] = React.useState([]);
  const [routeLoaded, setRouteLoaded] = React.useState(false);

  const userID = useSelector((state) => state.user.id)
  const userToken = useSelector((state) => state.user.token)

  const fetchRoutes = async () => {
    try {
      let response = await fetch(`${BACKEND}/routes/users/${userID}`,{
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': userToken
            }
        })

      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      alert(error)
      return { success: false };
    }
  }

  React.useEffect(() => {
    (async () => {
      setRouteLoaded(false);
      let res = await fetchRoutes();
      if (res.success) {
        setRoutes(res.data.data);
        console.log(res.data)
        setRouteLoaded(true);
      }
    })();
  }, []);

    const dispatch = useDispatch();

    function logout(){
        dispatch(setUserToken(null))
        props.navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            
          <View style={styles.box}>
          <Icon name={'account'} size={70} color={'black'}/>
            <Text nativeID='usernameProfile'>{ useSelector((state) => state.user.username) }</Text>
            <LogoutButton nativeID="logoutButton" onPress={()=>logout()}/>
          </View>
          <ScrollView>
            <Divider/>
              { 
                routeLoaded ? (
                    routes.map((route) => {
                      console.log(route)
                      return(<MapCard key={route.id}nativeID="mapCard" title={route.title} activityType={route.activityType} distance={Math.round(route.estimatedDistance/1000)} estimatedTime={route.estimatedTime} isPrivate={route.isPrivate} nbVoters={route.nbVoters} score={route.score} gps={route.coordinates.data}/>);
                  })):(<Text>No routes found !</Text>)
              }
            </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      padding:20,
      justifyContent:'center'
    },
    box:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    innerText: {
      color: colors.colorPrimary500.color
    },
    input : {
      height:40,
      marginTop: 12,
      marginBottom: 12
    },
    errorMsg:{
      color: "black",
    }
})
