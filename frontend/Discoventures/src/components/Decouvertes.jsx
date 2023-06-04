import React from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import { Divider } from "@react-native-material/core";
import { useSelector } from 'react-redux'
import MapCard from './MapCard';
const BACKEND = "https://discoventures.osc-fr1.scalingo.io"
export default function Decouvertes(props) {

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

  async function VisualiserParcours(route){
    console.log("decouvert");
    await fetch(`${BACKEND}/routes/${route.id}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      }
    }).then(response => response.json())
    .then(response =>{
      if(response.status == 200){
        let lesLieux = [];
        let descrip = [];
        for(let i=0; i< response.data.places.length; i++){
            lesLieux.push(({"coordinate": [response.data.places[i].longitude, response.data.places[i].latitude], "nom": response.data.places[i].title}));
            descrip.push(response.data.places[i].description);
        }
        console.log("navigate");

        props.navigation.navigate('ParcoursVisual',{
          latitude : route.coordinates.data.latitude,
          longitude : route.coordinates.data.longitude,
          lieux: lesLieux,
          description: descrip
        })
      }
    }) .catch(error => alert("Server error inscrire Get :" + error)); 
  }
    return (
        <View style={styles.container}>
          <ScrollView>
            <Divider/>
            { 
                routeLoaded ? (
                    routes.map((route) => {
                      console.log(route)
                      return(<MapCard key={route.id} nativeID={"decouvertesMapCard" + route.id} onPress={async ()=> VisualiserParcours(route)} title={route.title} activityType={route.activityType} distance={Math.round(route.estimatedDistance/1000)} estimatedTime={route.estimatedTime} isPrivate={route.isPrivate} nbVoters={route.nbVoters} score={route.score} gps={route.coordinates.data}/>);
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