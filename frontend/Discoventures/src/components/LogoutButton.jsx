import React from 'react';
<<<<<<< HEAD
import {StyleSheet, Pressable, View } from 'react-native';
=======
import {StyleSheet, Pressable,Text, View } from 'react-native';
>>>>>>> be9ea4d (logout & begin of cardmap)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors'

export default function LogoutButton({onPress, nativeID}) {
 
  return (
    <View >
    <Pressable style={styles.container} onPress={onPress} nativeID={nativeID}>
      <Icon name={'logout'} size={20} color={'white'}/>
    </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height : 40,
    width : 40,
    marginHorizontal : 23,
    backgroundColor: colors.colorError500.color,
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
