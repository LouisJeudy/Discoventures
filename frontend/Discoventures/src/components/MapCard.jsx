import React from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';
import fonts from '../style/fonts';
import colors from '../style/colors'
import StarRating from 'react-native-star-rating-widget';
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

    return (
<<<<<<< HEAD
        <View style={styles.mainContainer} nativeID={nativeID}>
=======
        <View style={styles.mainContainer}>
>>>>>>> e67a7f0 (mapCard in profile view)
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.title, fonts.textXlSemiBold]} nativeID='title'>{title}</Text>
                    <Text nativeID='privacy'>{isPrivate == true ? "Privé":"Public"}</Text>
                </View>
                <Image
<<<<<<< HEAD
                    source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+'+ colors.colorPrimary500.color.slice(1) +'('+ gps.latitude[0] +','+ gps.longitude[0] +'),'+ renderMarkerPlaces(places) +'path-5+f44-0.5(' + getUrlEncodedPolyline(gps) +')/auto/500x300?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsaG93dWFiejAxYXozcW84a3pxZms2YjkifQ.0SImY1_6NeTPUyAS765eAg'}}
                    style={styles.map}
                    nativeID='map'
=======
                source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-122.337798,37.810550,9.67,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsZ3V1ZzQxMzAxanMzbG11Z2E0cWJ0bmgifQ.7BRdbaWmQytXDZ8AE4CIaA'}}
                style={styles.map}
                />
                <Text style={[styles.title, fonts.textMSemiBold]}>Visite révolution francaise</Text>
                <Text>20km</Text>
                <StarRating
                    rating={rating}
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
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"timer-outline"} size={20}/>
                        <Text nativeID='time'>{convertMsToTime(estimatedTime)}</Text>
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={icons[activityType]} size={20}/>
                        <Text nativeID='activityType'>{activityType}</Text>
                    </View>
                </View>

                <View style={styles.score}>
                    <StarRating
                        nativeID="score"
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
        width: '100%',
=======
        width: '80%',
>>>>>>> e67a7f0 (mapCard in profile view)
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
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
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
    map:{
        width: '100%', 
        height: 150,
        alignSelf: 'center'
    },
    stars:{
        alignSelf: 'center'
    }

})
>>>>>>> e67a7f0 (mapCard in profile view)
