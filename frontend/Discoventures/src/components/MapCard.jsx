import React from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';
import fonts from '../style/fonts';
import colors from '../style/colors'
import StarRating from 'react-native-star-rating-widget';
<<<<<<< HEAD
<<<<<<< HEAD
import { convertMsToTime } from '../utils/time';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { renderMarkerPlaces, getUrlEncodedPolyline } from '../utils/staticImageMap';

export default function MapCard({nativeID, title, activityType, distance, estimatedTime, isPrivate, nbVoters, score, gps, places}) {
    // eslint-disable-next-line no-unused-vars
=======
const BACKEND = "http://localhost:3000"

export default function MapCard(props) {
>>>>>>> e67a7f0 (mapCard in profile view)
    const [rating, setRating] = React.useState(0);
    const icons = new Object();
    icons["walk"] = "walk";
    icons["run"] = "run-fast";
    icons["bike"] = "bike-fast"
=======
import { convertMsToTime } from '../utils/time';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { renderMarkerPlaces, getUrlEncodedPolyline } from '../utils/staticImageMap';

export default function MapCard({nativeID, title, activityType, distance, estimatedTime, isPrivate, nbVoters, score, gps, places, props}) {
    const [rating, setRating] = React.useState(0);
<<<<<<< HEAD
>>>>>>> 9788dcc (mapcard with informations)

    return (
<<<<<<< HEAD
        <View style={styles.mainContainer} nativeID={nativeID}>
=======
        <View style={styles.mainContainer}>
>>>>>>> e67a7f0 (mapCard in profile view)
            <View style={styles.container}>
                <View style={styles.header}>
<<<<<<< HEAD
                    <Text style={[styles.title, fonts.textXlSemiBold]} nativeID='title'>{title}</Text>
                    <Text nativeID='privacy'>{isPrivate == true ? "Privé":"Public"}</Text>
                </View>
                <Image
<<<<<<< HEAD
<<<<<<< HEAD
                    source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+'+ colors.colorPrimary500.color.slice(1) +'('+ gps.latitude[0] +','+ gps.longitude[0] +'),'+ renderMarkerPlaces(places) +'path-5+f44-0.5(' + getUrlEncodedPolyline(gps) +')/auto/500x300?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsaG93dWFiejAxYXozcW84a3pxZms2YjkifQ.0SImY1_6NeTPUyAS765eAg'}}
                    style={styles.map}
                    nativeID='map'
=======
                source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-122.337798,37.810550,9.67,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsZ3V1ZzQxMzAxanMzbG11Z2E0cWJ0bmgifQ.7BRdbaWmQytXDZ8AE4CIaA'}}
=======
                source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-a+9ed4bd(-122.46589,37.77343),pin-s-b+000(-122.42816,37.75965),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsZ3V1ZzQxMzAxanMzbG11Z2E0cWJ0bmgifQ.7BRdbaWmQytXDZ8AE4CIaA'}}
>>>>>>> 5fad1e7 (size of mapCard)
                style={styles.map}
                />
                <Text style={[styles.title]}>Visite révolution francaise</Text>
                <Text>20km</Text>
                <StarRating
                    rating={3.5}
                    onChange={setRating}
                    color={colors.colorPrimary500.color}
                    starSize={25}
                    style={styles.stars}
>>>>>>> e67a7f0 (mapCard in profile view)
                />
                <View style={styles.information}>
                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"map"} size={20}/>
                        <Text nativeID='distance'>{distance} km</Text>
=======
                    <Text style={[styles.title, fonts.textXlSemiBold]}>{title}</Text>
                    <Text>{isPrivate == true ? "Privé":"Public"}</Text>
                    {/* <Ionicons name={isPrivate = true ? "globe-outline":"globe-outline"} size={15}/> */}
=======
    const icons = new Object();
    icons["walk"] = "walk";
    icons["run"] = "run-fast";
    icons["bike"] = "bike-fast"

    return (
        <View style={styles.mainContainer} nativeID={nativeID}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.title, fonts.textXlSemiBold]} nativeID='title'>{title}</Text>
                    <Text nativeID='privacy'>{isPrivate == true ? "Privé":"Public"}</Text>
>>>>>>> 0482c1c (ADD Profile with map card => Cypress TO DO)
                </View>
                <Image
                    source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+'+ colors.colorPrimary500.color.slice(1) +'('+ gps.latitude[0] +','+ gps.longitude[0] +'),'+ renderMarkerPlaces(places) +'path-5+f44-0.5(' + getUrlEncodedPolyline(gps) +')/auto/500x300?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsaG93dWFiejAxYXozcW84a3pxZms2YjkifQ.0SImY1_6NeTPUyAS765eAg'}}
                    style={styles.map}
                    nativeID='map'
                />
                <View style={styles.information}>
                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"map"} size={20}/>
<<<<<<< HEAD
                        <Text>{distance} km</Text>
>>>>>>> 9788dcc (mapcard with informations)
=======
                        <Text nativeID='distance'>{distance} km</Text>
>>>>>>> 0482c1c (ADD Profile with map card => Cypress TO DO)
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"timer-outline"} size={20}/>
<<<<<<< HEAD
<<<<<<< HEAD
                        <Text nativeID='time'>{convertMsToTime(estimatedTime)}</Text>
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={icons[activityType]} size={20}/>
                        <Text nativeID='activityType'>{activityType}</Text>
=======
                        <Text>{convertMsToTime(estimatedTime)}</Text>
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"run-fast"} size={20}/>
                        <Text>Running</Text>
>>>>>>> 9788dcc (mapcard with informations)
=======
                        <Text nativeID='time'>{convertMsToTime(estimatedTime)}</Text>
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={icons[activityType]} size={20}/>
                        <Text nativeID='activityType'>{activityType}</Text>
>>>>>>> 0482c1c (ADD Profile with map card => Cypress TO DO)
                    </View>
                </View>

                <View style={styles.score}>
                    <StarRating
<<<<<<< HEAD
<<<<<<< HEAD
                        nativeID="score"
=======
>>>>>>> 9788dcc (mapcard with informations)
=======
                        nativeID="score"
>>>>>>> 0482c1c (ADD Profile with map card => Cypress TO DO)
                        rating={score}
                        onChange={setRating}
                        color={colors.colorPrimary500.color}
                        starSize={25}
                        style={styles.stars}
                    /><Text>({nbVoters})</Text>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: 'center'

    },
    container: {
        flexDirection: 'column',
        padding:10,
        paddingBottom: 20,
<<<<<<< HEAD
<<<<<<< HEAD
        width: '100%',
=======
        width: '80%',
>>>>>>> e67a7f0 (mapCard in profile view)
=======
        width: '100%',
>>>>>>> 5fad1e7 (size of mapCard)
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4,
        marginBottom: 5

    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9788dcc (mapcard with informations)
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
<<<<<<< HEAD
    map:{
        width: '100%', 
        height: 200,
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 5
    },
    stars:{
        alignSelf: 'center'
    },
    score: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    distance:{
        flexDirection: 'column',
        alignItems: 'center'
    }

})
=======
=======
>>>>>>> 9788dcc (mapcard with informations)
    map:{
        width: '100%', 
        height: 200,
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 5
    },
    stars:{
        alignSelf: 'center'
    },
    score: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    distance:{
        flexDirection: 'column',
        alignItems: 'center'
    }

})
>>>>>>> e67a7f0 (mapCard in profile view)
