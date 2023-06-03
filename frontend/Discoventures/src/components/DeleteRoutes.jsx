import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import ItemList from './ItemList';
import { useSelector } from 'react-redux';
const BACKEND = "http://localhost:3000"

export default function DeleteRoutes() {
    const [routes, setRoutes] = React.useState([]);
    const [routeLoaded, setRouteLoaded] = useState(false);
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
          <ScrollView>
              { 
                routeLoaded ? (
                    routes.map((route) => {
                      return(<ItemList onDelete={handleItemDelete} key={route.id} idRoute={route.id} title={route.title} distance={route.estimatedDistance/1000} time={route.estimatedTime} activityType={route.activityType}/>);
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
});
