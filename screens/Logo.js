import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useEffect, useRef } from 'react';
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
    }, 1300); // 1.3초 대기
    return () => clearTimeout(timer);
  },[])
  return (
    <View style={styles.container}>
      <View style={{marginBottom:hp('3%'), width:wp('48%'), flexDirection:'row'}}>
        <FadeInView delay={0}>
          <Text style={{fontSize: 30 }}>😊</Text>
        </FadeInView>
        <FadeInView delay={400}>
          <Text style={{fontSize: 30, marginHorizontal:wp('2%') }}>😒</Text>
        </FadeInView>
        <FadeInView delay={800}>
          <Text style={{fontSize: 30 }}>😘</Text>
        </FadeInView>
      </View>
      <Image source={require('../assets/logo.png')} resizeMode="cover"/>
    </View>
  );
}

const FadeInView = ({ delay, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500, // fade-in duration
        delay: delay, // delay before starting the fade-in
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, delay]);
  return (
    <Animated.View style={{opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
