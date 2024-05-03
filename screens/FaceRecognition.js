import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function FaceRecognition() {
  const [recog, setRecog] = useState(false); // 얼굴인식 전에는 false, 후에는 true
  return (
    <View style={styles.container}>
      {!recog ? (
        <View style={styles.top}>
          <Text style={styles.topText}>
            오늘 하루의 기분을 표정으로 말해주세요!
          </Text>
        </View>
      ) : (
        <View style={styles.top}>
          <Text style={styles.topText}>오늘 당신의 기분은 ( ) 맞나요?</Text>
        </View>
      )}
      <View style={styles.middle}></View>
      {!recog ? (
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>
            AI가 분석한 당신의 기분은 무엇일까요?
          </Text>
        </View>
      ) : (
        <View style={styles.afterBottom}>
          <TouchableOpacity style={styles.bottomText}>
            <Text style={styles.afterBottomText}>맞아요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomText}>
            <Text style={styles.afterBottomText}>아니요</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  // middle 부분에 카메라 넣을 것임.
  // 카메라로 얼굴을 인식한 뒤에는 recog를 true로 변경.
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  top: {
    width: wp('100%'),
    height: hp('25%'),
  },
  topText: {
    fontSize: 35,
    fontWeight: '600',
    marginTop: hp('10%'),
    marginHorizontal: wp('13%'),
    textAlign: 'center',
  },
  middle: {
    width: wp('100%'),
    height: hp('50%'),
    backgroundColor: 'lightgrey',
  },
  bottom: {
    width: wp('100%'),
    height: hp('25%'),
  },
  afterBottom: {
    width: wp('100%'),
    height: hp('25%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 35,
    fontWeight: '600',
    marginTop: hp('7%'),
    marginHorizontal: wp('13%'),
    textAlign: 'center',
  },
  afterBottomText: {
    fontSize: 30,
    fontWeight: '600',
    backgroundColor: 'red',
    paddingHorizontal: 7,
    paddingVertical: 7,
    marginHorizontal: -15,
  },
});
