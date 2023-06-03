import { StyleSheet, Text, View} from 'react-native';
import fonts from '../style/fonts';
import colors from '../style/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from "@react-native-material/core";
import DeleteButton from './DeleteButton';
import { convertMsToTime } from '../utils/time';
import { useSelector } from 'react-redux';
const BACKEND = "http://localhost:3000"

export default function ItemList({onDelete, idRoute, title, distance, time, activityType}){

    const icons = new Object();
    icons["walk"] = "walk";
    icons["run"] = "run-fast";
    icons["bike"] = "bike-fast"

    const token = useSelector((state) => state.user.token)

    const deleteRoute = async (id) => {
        try {
        await fetch(`${BACKEND}/routes/${id}`,{
                method:'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
                }
            })
        onDelete(id)
        } catch (error) {
        console.log(error);
        return { success: false };
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.route}>
                    <View style={styles.title}>
                        <Text style={fonts.textXlSemiBold}>{title}</Text>
                    </View>
                    <View style={styles.data}>
                        <View style={styles.information}>
                            <MaterialCommunityIcons name={"map"} size={15}/>
                            <Text nativeID='adminDistance'>{distance} km</Text>
                        </View>
                        <View style={styles.information}>
                            <MaterialCommunityIcons name={"timer-outline"} size={15}/>
                            <Text nativeID='adminTime'>{convertMsToTime(time)}</Text>
                        </View>
                        <View style={styles.information}>
                            <MaterialCommunityIcons name={icons[activityType]} size={15}/>
                            <Text nativeID='adminActivityType'>{activityType}</Text>
                        </View>
                    </View>
                </View>
                <DeleteButton onPress={()=>deleteRoute(idRoute)}/>
            </View>
            <Divider/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        width: "100%",
        marginBottom: 10
    },
    container:{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    route:{
        marginLeft: 5
    },
    data:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    information:{
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        color: colors.colorNeutral100.color
    },
    title:{
        flexDirection: "row",
        justifyContent: "center",
        borderBottomWidth:1,
        borderBottomColor: colors.colorNeutral200.color,
        marginBottom: 5
    }
})
