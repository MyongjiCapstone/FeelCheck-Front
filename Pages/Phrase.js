import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Phrase() {
  return (
    <LinearGradient colors={['skyblue', 'white']} style={styles.container}>
      <View style={styles.pg_top}>
        <Text style={styles.text}>행복은 습관이다, 그것을 몸에 지니라.</Text>
        <Text style={styles.author}>- 허버드</Text>
      </View>
      <View style={styles.pg_bottom}>
        <TouchableOpacity>
          <Text style={styles.btn}>확인</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  pg_top: {
    flexDirection: 'row',
    flex: hp('70%'),
    justifyContent: 'space-evenly', // 양 옆으로 정렬
    paddingTop: hp('15%'),
    paddingHorizontal: wp('8%'),
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  text: {
    flex: hp('80%'),
    fontSize: 50,
    fontWeight: '500',
    color: 'black',
  },
  author: {
    flex: hp('20%'),
    fontSize: 30,
    marginBottom: wp('8%'),
    fontWeight: '500',
    textAlign: 'right',
  },
  pg_bottom: {
    flex: hp('30%'),
    alignItems: 'center',
  },
  btn: {
    fontSize: 40,
    marginVertical: wp('5%'),
    paddingVertical: wp('2.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 30,
    borderWidth: 1,
  },
});

export default Phrase;
