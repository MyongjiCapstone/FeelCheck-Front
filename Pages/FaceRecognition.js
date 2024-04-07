import { StyleSheet, View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function FaceRecognition() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>
          오늘 하루의 기분을 표정으로 말해주세요!
        </Text>
      </View>
      <View style={styles.middle}></View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          AI가 분석한 당신의 기분은 무엇일까요?
        </Text>
      </View>
    </View>
  );
  // middle 부분에 카메라 넣을 것임.
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
  bottomText: {
    fontSize: 35,
    fontWeight: '600',
    marginTop: hp('7%'),
    marginHorizontal: wp('13%'),
    textAlign: 'center',
  },
});
