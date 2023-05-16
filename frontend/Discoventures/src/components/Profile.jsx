import React from 'react';
import { StyleSheet, Image, Text, View} from 'react-native';
import fonts from '../style/fonts';
import colors from '../style/colors'
import { Divider } from "@react-native-material/core";
import LogoutButton from './LogoutButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux'
import { userToken } from '../app/slices/userSlice';

const BACKEND = "http://localhost:3000"

export default function Profile(props) {

    const dispatch = useDispatch();

    function logout(){
        dispatch(userToken(null))
        props.navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            
          <View style={styles.box}>
          <Icon name={'account'} size={70} color={'black'}/>
            <Text 
                style={fonts.textXmRegular}
                nativeID='errorMsgSignIn'
            >
                Louis Jeudy
            </Text>
            <LogoutButton onPress={()=>logout()}/>
          </View>
          <Divider/>

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