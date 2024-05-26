import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useEffect } from 'react';
import useEmotion from '../hook/useemotion';
import { useNavigation } from '@react-navigation/native';

export default function Logo() {
  // 여기서 오늘의 감정이 존재하는지 확인함. 없으면 카메라 페이지로, 있으면 해당 감정(Happy, Sad 등) param에 넣어서 메인페이지로 replace 이동
  const {checkEmotion} = useEmotion();
  const navigation = useNavigation();
  useEffect(()=>{
    const timer = setTimeout(() => {
      checkEmotion().then(res=>{
        if (res.hasEmotion){
          navigation.replace('MainNav', {emotion: res.emotion});
        }
        else {
          navigation.replace('EmotionCamera');
        }
      });
    }, 1000); // 1.3초 대기
    return () => clearTimeout(timer);
  },[])
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
