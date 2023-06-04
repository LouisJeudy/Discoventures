import { StyleSheet, View, Pressable, Text } from 'react-native';
import colors from '../style/colors';
import fonts from '../style/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-elements';
export default function CardRadioButtonText({titre, icon, text}) {
  return (
    <View >
      <Card containerStyle={styles.card}>
          <Text style={styles.titlecard}>{titre}</Text>
          <Pressable disabled={true} style={styles.RButtonStyle}>
            <Icon name={icon} style={styles.icon} size={27}/>
            <Text style={fonts.textMRegular}>{text}</Text>
          </Pressable>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    borderColor: 'transparent',
    borderWidth :0,
    shadowColor: 'transparent',
    height : 90,
    width: 110,
    alignItems: 'center',
    alignContent:"center",
    justifyContent: "center",
  },
  RButtonStyle: {
    height : 80,
    width : 80,
    backgroundColor:  colors.colorNeutral50.color,
    borderRadius:16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlecard:{
    fontSize:10,
    marginBottom:10,
    color :  colors.colorNeutralDark100.color, 
  },
  icon:{
    marginBottom:7, 
  }
});
