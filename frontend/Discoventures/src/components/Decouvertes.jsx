import React from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import { Divider } from "@react-native-material/core";
import { useSelector } from 'react-redux'
import MapCard from './MapCard';
const BACKEND = "http://localhost:3000"

export default function Decouvertes() {

  const [routes, setRoutes] = React.useState([]);
  const [routeLoaded, setRouteLoaded] = React.useState(false);
  const token = useSelector((state) => state.user.token)

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

  React.useEffect(() => {
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

    return (
        <View style={styles.container}>
          <ScrollView>
            <Divider/>
            { 
                routeLoaded ? (
                    routes.map((route) => {
                      console.log(route)
                      return(<MapCard key={route.id} nativeID={"decouvertesMapCard" + route.id} title={route.title} activityType={route.activityType} distance={Math.round(route.estimatedDistance/1000)} estimatedTime={route.estimatedTime} isPrivate={route.isPrivate} nbVoters={route.nbVoters} score={route.score} gps={route.coordinates.data}/>);
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
    }
  })