import React from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';
import fonts from '../style/fonts';
import colors from '../style/colors'
import StarRating from 'react-native-star-rating-widget';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUrlEncodedPolyline } from '../utils/staticImageMap';

export default function MapCard({nativeID, title, activityType, distance, estimatedTime, isPrivate, nbVoters, score, gps}) {

    const icons = new Object();
    icons["walk"] = "walk";
    icons["run"] = "run-fast";
    icons["bike"] = "bike-fast"
    return (
        <View style={styles.mainContainer} nativeID={nativeID}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.title, fonts.textXlSemiBold]} nativeID='mpTitle'>{title}</Text>
                    <Text nativeID='mpPrivacy'>{isPrivate == true ? "Privé":"Public"}</Text>
                </View>
                <Image
                    source={{uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+'+ colors.colorPrimary500.color.slice(1) +'('+ gps.longitude[0] +','+ gps.latitude[0] +'),path-5+f44-0.5(' + getUrlEncodedPolyline(gps) +')/auto/500x300?access_token=pk.eyJ1IjoiY3ZuZHNoIiwiYSI6ImNsaG93dWFiejAxYXozcW84a3pxZms2YjkifQ.0SImY1_6NeTPUyAS765eAg'}}
                    style={styles.map}
                    nativeID='mpMap'
                />
                <View style={styles.information}>
                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"map"} size={20}/>
                        <Text nativeID='mpDistance'>{distance} km</Text>
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={"timer-outline"} size={20}/>
                        <Text nativeID='mpTime'>{new Date(estimatedTime * 1000).toISOString().slice(11, 19)}</Text>
                    </View>

                    <View style={styles.distance}>
                        <MaterialCommunityIcons name={icons[activityType]} size={20}/>
                        <Text nativeID='mpActivityType'>{activityType}</Text>
                    </View>
                </View>

                <View style={styles.score}>
                    <StarRating
                        onChange={()=>{}}
                        enableSwiping={false}
                        enableHalfStar={true}
                        rating={score}
                        color={colors.colorPrimary500.color}
                        starSize={25}
                        style={styles.stars}
                    />
                    <Text nativeID="mpNbVoters">({nbVoters})</Text>
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
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4,
        marginBottom: 25
    },
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
