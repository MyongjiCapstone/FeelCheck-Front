import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Logo() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: 'white', fontSize: 30 }}>😊😒😘</Text>
        <Text style={styles.text}>기분 어때</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 60,
    color: 'skyblue',
    fontWeight: '800',
    shadowColor: '#000',
    shadowOffset: {
      width: wp('0%'),
      height: hp('0.4%'),
    },
    shadowOpacity: 0.3,
  },
});
