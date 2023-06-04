import { StyleSheet, Text, View, Image } from "react-native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fonts from "../style/fonts";
import colors from "../style/colors";
import DeleteButton from "./DeleteButton";
const BACKEND = "http://localhost:3000";
import { getUrlEncodedPolyline } from '@/utils/staticImageMap';

export default function ItemList({
  onDelete,
  idRoute,
  title,
  distance,
  time,
  activityType,
  gps,
}) {
  const icons = new Object();
  icons["walk"] = "walk";
  icons["run"] = "run-fast";
  icons["bike"] = "bike-fast";

  const token = useSelector((state) => state.user.token);

  const deleteRoute = async (id) => {
    try {
      await fetch(`${BACKEND}/routes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      onDelete(id);
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.route}>
          <View style={styles.title}>
            <Text style={ fonts.textXlMedium}>{title}</Text>
          </View>
          <Image
            source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+'+ colors.colorPrimary500.color.slice(1) +'('+ gps.longitude[0] +','+ gps.latitude[0] +'),path-5+f44-0.5(' + getUrlEncodedPolyline(gps) +')/auto/500x300?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsaG93dWFiejAxYXozcW84a3pxZms2YjkifQ.0SImY1_6NeTPUyAS765eAg'}}
            style={styles.map}
            nativeID='map'
            />
          <View style={styles.data}>
            <View style={styles.information}>
              <MaterialCommunityIcons name={"map"} size={15} />
              <Text style={fonts.textSRegular} nativeID="adminDistance">{Math.round(distance)} km</Text>
            </View>
            <View style={styles.information}>
              <MaterialCommunityIcons name={"timer-outline"} size={15} />
              <Text style={fonts.textSRegular} nativeID="adminTime">
                {new Date(time * 1000).toISOString().slice(11, 19)}
              </Text>
            </View>
            <View style={styles.information}>
              <MaterialCommunityIcons name={icons[activityType]} size={15} />
              <Text style={fonts.textSRegular} nativeID="adminActivityType">{activityType}</Text>
            </View>
          </View>
        </View>
        <View style={styles.button}>
            <DeleteButton onPress={() => deleteRoute(idRoute)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    boxShadow: "1px 2px 9px" + colors.colorNeutral100.color,
    padding: 6
  },
  container: {
    position: 'relative'
  },
  route: {
    marginLeft: 16,
    marginRight: 16,
  },
  map: {
    width: '100%', 
    height: 200,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 5
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
  },
  information: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    color: colors.colorNeutral700.color,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 6,
    marginTop: 6,
  },
  button: {
    position: "absolute",
    top: 6,
    right: 4
  }
});