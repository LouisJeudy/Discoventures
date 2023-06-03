import React from 'react';
import {StyleSheet, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DeleteButton({onPress, nativeID}) {
 
  return (
    <View >
    <Pressable style={styles.container} onPress={onPress} nativeID={nativeID}>
      <Icon name={'delete'} size={30} color={'red'}/>
    </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height : 40,
    width : 40,
    marginHorizontal : 23,
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
